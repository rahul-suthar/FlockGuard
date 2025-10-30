import {
  Animated,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useTheme } from '../context/Theme.context';
import GameCard from '../components/GameCard.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePopup } from '../context/Popup.context.js';
import { BlurView } from '@react-native-community/blur';
import Confetti from 'react-native-confetti-cannon';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather.js';

const initialBoard = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => ({
    id: i * 5 + j,
    num: i * 5 + j + 1,
    isFlipped: false,
    isDisable: false,
  })),
);

const Game = () => {
  const theme = useColorScheme();
  const { showPopup } = usePopup();
  const colors = useTheme();
  const [boardName, setBoardName] = useState('');
  const [nameInput, setNameInput] = useState('bingo');

  const { width, height } = Dimensions.get('window');

  const [board, setBoard] = useState([]);
  const [botBoard, setBotBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [win, setWin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const botTimerRef = useRef(null);
  const boardAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(boardAnim, {
      toValue: win ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [win]);

  useEffect(() => {
    if (isMyTurn || !isPlaying) {
      if (botTimerRef.current) {
        clearTimeout(botTimerRef.current);
      }
      return;
    }

    const minDelay = 800;
    const maxDelay = 2000;
    const botDelay =
      Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

    if (score < boardName.length && botScore < boardName.length) {
      botTimerRef.current = setTimeout(() => {
        botMove();
        setIsMyTurn(true);
      }, botDelay);
    }
    return () => clearTimeout(botTimerRef.current);
  }, [isMyTurn, isPlaying]);

  useEffect(() => {
    if (!score && !botScore) return;
    if (score >= boardName.length) {
      setWin(true);
      setIsPlaying(false);
      setShowConfetti(true);
      const gameTimer = setTimeout(() => {
        resetGame();
        setShowConfetti(false);
      }, 4000);
      return () => {
        clearTimeout(gameTimer);
      };
    }
    if (botScore >= boardName.length) {
      setWin(true);
      setIsPlaying(false);
      showPopup({ success: false, msg: 'Bot won!..' });
      const gameTimer = setTimeout(() => {
        resetGame();
      }, 1200);
      return () => clearTimeout(gameTimer);
    }
  }, [score, botScore]);

  // useEffect(() => {
  //   nameGenerator();
  //   resetGame();

  //   return () => {
  //     if (botTimerRef.current) {
  //       clearTimeout(botTimerRef.current);
  //       botTimerRef.current = null;
  //     }
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      nameGenerator();
      resetGame();

      return () => {
        if (botTimerRef.current) {
          clearTimeout(botTimerRef.current);
          botTimerRef.current = null;
        }
      };
    }, []),
  );

  const checkBingo = b => {
    const n = b.length;
    let score = 0;

    for (let i = 0; i < n; i++) {
      if (b[i].every(c => c.isFlipped)) score++;
    }

    for (let j = 0; j < n; j++) {
      let allFlipped = true;
      for (let i = 0; i < n; i++) {
        if (!b[i][j].isFlipped) {
          allFlipped = false;
          break;
        }
      }
      if (allFlipped) score++;
    }

    const diag1 = Array.from({ length: n }, (_, i) => b[i][i].isFlipped).every(
      Boolean,
    );
    const diag2 = Array.from(
      { length: n },
      (_, i) => b[i][n - 1 - i].isFlipped,
    ).every(Boolean);

    if (diag1) score++;
    if (diag2) score++;

    return score;
  };

  const handlePlayerMove = (row, col) => {
    if (!isMyTurn || board[row][col].isFlipped) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }

    const selectedNum = board[row][col].num;

    setBoard(prev => {
      const updated = prev.map((r, i) =>
        i === row
          ? r.map((c, j) =>
              j === col ? { ...c, isFlipped: true, isDisable: true } : c,
            )
          : r,
      );
      const newScore = checkBingo(updated);
      setScore(newScore);
      return updated;
    });

    setBotBoard(prev => {
      const updated = prev.map((r, i) =>
        r.map((c, j) =>
          c.num === selectedNum
            ? { ...c, isFlipped: true, isDisable: true }
            : c,
        ),
      );
      const newScore = checkBingo(updated);
      setBotScore(newScore);
      return updated;
    });

    setIsMyTurn(false);
  };

  const botMove = () => {
    const notFlipped = botBoard.flat().filter(card => !card.isFlipped);

    if (notFlipped.length === 0) {
      return;
    }

    const randIdx = Math.floor(Math.random() * notFlipped.length);
    const selectedNum = notFlipped[randIdx].num;

    setBotBoard(prev => {
      const updated = prev.map(r =>
        r.map(c =>
          c.num === selectedNum
            ? { ...c, isDisable: true, isFlipped: true }
            : c,
        ),
      );
      const newScore = checkBingo(updated);
      setBotScore(newScore);
      return updated;
    });

    setBoard(prev => {
      const updated = prev.map(r =>
        r.map(c =>
          c.num === selectedNum
            ? { ...c, isDisable: true, isFlipped: true }
            : c,
        ),
      );
      const newScore = checkBingo(updated);
      setScore(newScore);
      return updated;
    });
  };

  const shuffleBoard = setGameBoard => {
    setGameBoard(() => {
      const freshBoard = JSON.parse(JSON.stringify(initialBoard));
      const flat = freshBoard.flat();
      for (let i = flat.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flat[i], flat[j]] = [flat[j], flat[i]];
      }
      const newGameBoard = Array.from({ length: 5 }, (_, i) =>
        flat
          .slice(i * 5, i * 5 + 5)
          .map(c => ({ ...c, isDisable: false, isFlipped: false })),
      );
      return newGameBoard;
    });
  };

  const resetGame = () => {
    setScore(0);
    setBotScore(0);
    setWin(false);
    shuffleBoard(setBoard);
    shuffleBoard(setBotBoard);
    setIsMyTurn(true);
    if (isPlaying) setIsPlaying(false);
  };

  const nameGenerator = () => {
    const nameArr = nameInput.toUpperCase().split('');
    setBoardName(nameArr);
  };

  const handleClose = () => {
    if (0 < nameInput.length && nameInput.length < 11) {
      nameGenerator();
    }
    setShowModel(false);
  };

  return (
    <View style={[styles.cont, { backgroundColor: colors.appBg }]}>
      {showConfetti && (
        <Confetti
          key={score}
          count={100}
          origin={{ x: width / 2, y: height }}
          explosionSpeed={300}
          fallSpeed={1000}
          fadeOut={true}
          autoStart={true}
          autoStartDelay={0}
          style={StyleSheet.absoluteFill}
        />
      )}

      <Modal visible={showModel} animationType="fade" transparent={true}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={theme}
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
        <View style={[styles.nameModal, { backgroundColor: colors.cardBg }]}>
          <TouchableOpacity onPress={()=>setShowModel(false)} style={{position: 'absolute', right: 10, top: 10}}>
            <Feather name={'x-circle'} color={colors.textPrimary} size={28} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 26,
              textAlign: 'center',
              fontFamily: 'Lato-Bold',
            }}
          >
            Change Game Word
          </Text>
          <TextInput
            placeholder="Game Word"
            placeholderTextColor={colors.textSecondary}
            value={nameInput}
            onChangeText={name =>
              setNameInput(prev => (name.length < 11 ? name.trim() : prev))
            }
            style={[
              styles.input,
              { backgroundColor: colors.input, color: colors.textPrimary },
            ]}
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.success,
              borderRadius: 4,
              paddingVertical: 6,
            }}
            onPress={handleClose}
          >
            <Text
              style={{
                color: colors.appBg,
                fontSize: 24,
                textAlign: 'center',
                fontFamily: 'Lato-Bold',
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={[styles.stateBoard, { backgroundColor: colors.cardBg }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1.6,
              justifyContent: 'center',
              alignItems: 'center',
              paddingStart: 36,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              {boardName &&
                boardName.map((w, i) => (
                  <Text
                    key={i}
                    style={{
                      color: i < score ? colors.disabled : colors.textPrimary,
                      fontSize: 30,
                      fontFamily: 'Lato-Bold',
                    }}
                  >
                    {w}
                  </Text>
                ))}
            </View>
          </View>
          <TouchableOpacity
            disabled={isPlaying}
            onPress={() => setShowModel(true)}
            style={{ flex: 0.2, padding: 8 }}
          >
            <Feather name={'edit-3'} size={26} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: 'center',
            backgroundColor: colors.appBg,
            width: 260,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 56,
              fontFamily: 'OpenSans-Regular',
            }}
          >
            {score}
            {'  -  '}
            {botScore}
          </Text>
          <TouchableOpacity
            onPress={resetGame}
            style={{ padding: 8, position: 'absolute', bottom: 0, right: 4 }}
          >
            <Feather name={'refresh-cw'} size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          color: colors.accent,
          fontSize: 30,
          fontFamily: 'Lato-Bold',
        }}
      >
        {!win ? (isMyTurn ? 'Your Turn' : "Bot's Turn") : 'Shuffling Board'}
      </Text>

      <Animated.View
        style={[
          styles.outerContainer,
          { backgroundColor: colors.cardBg },
          { opacity: boardAnim, transform: [{ scale: boardAnim }] },
        ]}
      >
        {board.map((row, i) => (
          <View key={i} style={styles.innerContainer}>
            {row.map((card, j) => (
              <GameCard
                key={card.id}
                colors={colors}
                onToggle={() => handlePlayerMove(i, j)}
                isFlipped={card.isFlipped}
                isDisable={card.isDisable || !isMyTurn}
                number={card.num}
              />
            ))}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  outerContainer: {
    borderRadius: 20,
    padding: 12,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stateBoard: {
    padding: 24,
    borderRadius: 16,
    gap: 32,
    width: '85%',
    alignItems: 'center',
  },
  nameModal: {
    width: '85%',
    margin: 'auto',
    borderRadius: 16,
    padding: 24,
    gap: 32,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontFamily: 'Lato-Bold',
    fontSize: 24,
  },
  winTextCont: {
    height: 450,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
