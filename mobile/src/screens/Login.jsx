import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fonts } from '../constants/fontSize.js';
import { handleLogin } from '../apis/auth.js';
import { useCustomState } from '../hooks/state.js';
import { useAuth } from '../context/Auth.context.js';
import { usePopup } from '../context/Popup.context.js';
import { useLoader } from '../context/Loader.context.js';
import { useTheme } from '../context/Theme.context.js';
import { useEffect, useRef, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

const Login = ({ navigation }) => {
  const colors = useTheme();
  const { setUser } = useAuth();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [logForm, setLogForm, resetLogForm] = useCustomState({
    email: '',
    password: '',
  });
  const [showImg, setShowImg] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const imgHeiAnim = useRef(new Animated.Value(showImg ? 250 : 0)).current;

  const runImgAnim = () => {
    Animated.timing(imgHeiAnim, {
      toValue: showImg ? 250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    runImgAnim();
  }, [showImg]);

  const handleDataChange = (field, text) => {
    setLogForm(prev => ({ ...prev, [field]: text }));
  };

 const handleSubmit = async () => {
  if (!logForm.email.trim() || !logForm.password.trim()) {
    showPopup({ success: false, msg: 'Please enter both email and password.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(logForm.email.trim())) {
    showPopup({ 
      success: false, 
      msg: 'Please enter a valid email address.' 
    });
    return;
  }

  setShowLoad({ show: true, msg: 'Logging In...' });
  try {
    await handleLogin(logForm, setUser, showPopup);
    resetLogForm();
  } catch (error) {
  } finally {
    setShowLoad({ show: false, msg: '' });
  }
};
  const changeLayout = () => {
    Keyboard.dismiss();
    setShowImg(true);
  };

  return (
    <TouchableWithoutFeedback onPress={changeLayout} accessible={false}>
      <View style={[styles.container, { backgroundColor: colors.appBg }]}>
        <Animated.View
          style={{ height: imgHeiAnim, overflow: 'hidden'}}
        >
          <Image
            style={{
              width: 140,
              height: 140,
            }}
            resizeMode='contain'
            source={require('../assets/images/logo.png')}
          />
        </Animated.View>
        <View style={styles.form}>
          <Text style={[styles.headText, { color: colors.textPrimary }]}>
            Login
          </Text>
          <View style={{ gap: 30 }}>
            <TextInput
              style={[
                styles.inputs,
                { backgroundColor: colors.input, color: colors.textPrimary },
              ]}
              placeholder="email"
              value={logForm.email}
              onChangeText={text => handleDataChange('email', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              onFocus={() => setShowImg(false)}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    backgroundColor: colors.input,
                    color: colors.textPrimary,
                    paddingRight: 50,
                  },
                ]}
                placeholder="password"
                value={logForm.password}
                onChangeText={text => handleDataChange('password', text)}
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                onFocus={() => setShowImg(false)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPass(prev => !prev)}
              >
                <FontAwesome5
                  color={colors.textPrimary}
                  size={18}
                  name={showPass ? 'eye' : 'eye-slash'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={[styles.mainBtn, { backgroundColor: colors.primary }]}
              onPress={() => handleSubmit()}
            >
              <Text style={[styles.mainText, { color: colors.textWhite }]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secBtn}
              onPress={() => {
                setShowImg(true);
                navigation.navigate('Register');
              }}
            >
              <Text style={[styles.text, { color: colors.textSecondary }]}>
                New User?
              </Text>
              <Text style={[styles.secText, { color: colors.primary }]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: '50%',
    width: 340,
    alignItems: 'center',
    gap: 50,
    paddingTop: 18,
  },
  headText: {
    fontSize: fonts.head.primary,
    fontFamily: 'Lato-Bold',
  },
  inputs: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
  },
  eyeIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
    padding: 8,
    borderRadius: 14,
  },
  btns: {
    alignItems: 'center',
    gap: 20,
  },
  mainBtn: {
    width: 280,
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  mainText: {
    fontSize: 28,
    fontFamily: 'Lato-Bold',
  },
  secBtn: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: fonts.text.primary,
  },
  secText: {
    fontSize: fonts.text.primary,
    fontFamily: 'Lato-Bold',
  },
});
