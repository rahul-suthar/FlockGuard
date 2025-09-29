import {
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
import { useAuth } from '../context/AuthContext.js';
import { usePopup } from '../context/PopupContext.js';

const Login = ({ navigation }) => {
  const { setUser } = useAuth();
  const { showPopup } = usePopup();
  const [logForm, setLogForm, resetLogForm] = useCustomState({
    email: '',
    password: '',
  });

  const handleDataChange = (field, text) => {
    setLogForm(prev => ({ ...prev, [field]: text }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.welcomeBox}>
          <Text style={styles.msgText}>Welcome to,</Text>
          <Text style={styles.brandText}>FlockGuard</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.headText}>Login</Text>
          <View style={{ gap: 30 }}>
            <TextInput
              style={styles.inputs}
              placeholder="email"
              value={logForm.email}
              onChangeText={text => handleDataChange('email', text)}
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              style={styles.inputs}
              placeholder="password"
              value={logForm.password}
              onChangeText={text => handleDataChange('password', text)}
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.mainBtn}
              onPress={() => handleLogin(logForm, resetLogForm, setUser, showPopup)}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.appBg,
    position: 'relative',
  },
  welcomeBox: {
    alignItems: 'center',
    gap: 5,
  },
  msgText: {
    fontSize: fonts.head.primary,
    fontFamily: 'Lato-Bold',
    color: colors.textPrimary,
  },
  brandText: {
    fontSize: fonts.brand.main,
    fontFamily: 'Lato-Black',
    color: colors.primary,
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
