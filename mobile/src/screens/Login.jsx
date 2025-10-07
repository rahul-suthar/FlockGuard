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
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';
import { handleLogin } from '../apis/auth.js';
import { useCustomState } from '../hooks/state.js';
import { useAuth } from '../context/Auth.context.js';
import { usePopup } from '../context/Popup.context.js';
import { useLoader } from '../context/Loader.context.js';

const Login = ({ navigation }) => {
  const { setUser } = useAuth();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [logForm, setLogForm, resetLogForm] = useCustomState({
    email: '',
    password: '',
  });

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../assets/images/logo.png')}
        />
        <View style={styles.form}>
          <Text style={styles.headText}>Login</Text>
          <View style={{ gap: 30 }}>
            <TextInput
              style={styles.inputs}
              placeholder="email"
              value={logForm.email}
              onChangeText={text => handleDataChange('email', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputs}
              placeholder="password"
              value={logForm.password}
              onChangeText={text => handleDataChange('password', text)}
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.mainBtn}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.mainText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secBtn}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.text}>New User?</Text>
              <Text style={styles.secText}>Register</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBg,
    position: 'relative',
    gap: 30,
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
    color: colors.textPrimary,
  },
  inputs: {
    backgroundColor: colors.input,
    width: 300,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
    color: colors.textPrimary,
  },
  btns: {
    alignItems: 'center',
    gap: 20,
  },
  mainBtn: {
    backgroundColor: colors.primary,
    width: 280,
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  mainText: {
    fontSize: fonts.btn.primary,
    fontFamily: 'Lato-Bold',
    color: colors.textWhite,
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
    color: colors.primary,
  },
});
