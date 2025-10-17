import {
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
import { useState } from 'react';
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

  const handleDataChange = (field, text) => {
    setLogForm(prev => ({ ...prev, [field]: text }));
  };

  const handleSubmit = async () => {
    if (!logForm.email.trim() || !logForm.password.trim()) {
      showPopup({ success: false, msg: 'All fields required.' });
      return;
    }
    setShowLoad({ show: true, msg: 'Logging In...' });
    try {
      await handleLogin(logForm, setUser, showPopup);
      resetLogForm();
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
        <Image
          style={[styles.img, { display: showImg ? '' : 'none' }]}
          source={require('../assets/images/logo.png')}
        />
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
              onPress={() => setShowImg(false)}
            />
            <View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    backgroundColor: colors.input,
                    color: colors.textPrimary,
                    paddingRight: 52,
                  },
                ]}
                placeholder="password"
                value={logForm.password}
                onChangeText={text => handleDataChange('password', text)}
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                onPress={() => setShowImg(false)}
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
    position: 'relative',
    gap: 30,
    paddingVertical: '24%',
  },
  img: {
    width: 250,
    height: 250,
  },
  form: {
    height: '50%',
    width: 300,
    alignItems: 'center',
    gap: 50,
  },
  headText: {
    fontSize: fonts.head.primary,
    fontFamily: 'Lato-Bold',
  },
  inputs: {
    width: 300,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 6,
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
    padding: 10,
    borderRadius: 50,
  },
  mainText: {
    fontSize: fonts.btn.primary,
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
