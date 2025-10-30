import { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

const GameCard = ({ colors, onToggle, isFlipped, isDisable, number }) => {
  const color = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const flip = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;

  const bgColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.disabled, colors.appBg],
  });

  const flipValue = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    const targetVal = isFlipped ? 1 : 0;
    Animated.parallel([
      Animated.timing(color, {
        toValue: targetVal,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: isFlipped ? 1.1 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(flip, {
        toValue: targetVal,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      console.log('animation done');
    });
  }, [isFlipped, color, scale, flip]);

  return (
    <TouchableOpacity disabled={isDisable} onPress={onToggle}>
      <Animated.View
        style={[
          styles.gameCard,
          {
            backgroundColor: bgColor,
            transform: [
              { scale: scale },
              { rotateX: flipValue },
              { rotateY: flipValue },
            ],
          },
        ]}
      >
        {!isFlipped && (
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            {number}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(GameCard);

const styles = StyleSheet.create({
  gameCard: {
    aspectRatio: 1,
    borderRadius: 12,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
});
