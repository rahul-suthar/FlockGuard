import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fonts } from '../constants/fontSize.js';
import { handleRegister } from '../apis/auth.js';
import { useCustomState } from '../hooks/state.js';
import { usePopup } from '../context/Popup.context.js';
import { useLoader } from '../context/Loader.context.js';
import { useTheme } from '../context/Theme.context.js';
import { useEffect, useRef, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

const Register = ({ navigation }) => {
  const colors = useTheme();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [regForm, setRegForm, resetRegForm] = useCustomState({
    name: '',
    email: '',
    password: '',
    phone: {
      code: '+91',
      mobileNo: 0,
    },
    role: 'farmer',
  });
  const [shiftLayout, setShiftLayout] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const shiftAnim = useRef(new Animated.Value(shiftLayout ? 1 : 0)).current;
  const layoutPad = shiftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [220, 80],
  });

  const runAnim = () => {
    Animated.timing(shiftAnim, {
      toValue: shiftLayout ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    runAnim();
  }, [shiftLayout]);

  const handleDataChange = (field, text) => {
    if (field === 'mobileNo') {
      setRegForm(prev => ({
        ...prev,
        phone: {
          ...prev.phone,
          mobileNo: Number(text),
        },
      }));
    } else {
      setRegForm(prev => ({ ...prev, [field]: text }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'password'];

    const hasEmpty = requiredFields.some(field => {
      const value = regForm[field];
      return !value || value.trim().length === 0;
    });

    if (hasEmpty) {
      showPopup({ success: false, msg: 'All fields required.' });
      return;
    }

    if (regForm.phone.mobileNo <= 999999999) {
      showPopup({ success: false, msg: 'Invalid mobile number.' });
      return;
    }

    setShowLoad({ show: true, msg: 'Registering User...' });
    try {
      await handleRegister(regForm, showPopup);
      resetRegForm();
    } finally {
      setShowLoad({ show: false, msg: '' });
    }
  };

  const changeLayout = () => {
    Keyboard.dismiss();
    setShiftLayout(false);
  };

  return (
    <TouchableWithoutFeedback onPress={changeLayout} accessible={false}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.appBg,
            paddingTop: layoutPad,
          },
        ]}
      >
        <View style={styles.form}>
          <Text style={[styles.headText, { color: colors.textPrimary }]}>
            Register
          </Text>
          <View style={{ gap: 24, alignItems: 'center' }}>
            <TextInput
              style={[
                styles.inputs,
                { backgroundColor: colors.input, color: colors.textPrimary },
              ]}
              placeholder="name"
              value={regForm.name}
              onChangeText={text => handleDataChange('name', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              onFocus={() => setShiftLayout(true)}
            />
            <TextInput
              style={[
                styles.inputs,
                { backgroundColor: colors.input, color: colors.textPrimary },
              ]}
              placeholder="email"
              placeholderTextColor={colors.textSecondary}
              value={regForm.email}
              onChangeText={text => handleDataChange('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setShiftLayout(true)}
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
                value={regForm.password}
                onChangeText={text => handleDataChange('password', text)}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                secureTextEntry={!showPass}
                onFocus={() => setShiftLayout(true)}
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
            <TextInput
              style={[
                styles.inputs,
                { backgroundColor: colors.input, color: colors.textPrimary },
              ]}
              placeholder="mobile No."
              value={
                !regForm.phone.mobileNo ? '' : String(regForm.phone.mobileNo)
              }
              onChangeText={text => handleDataChange('mobileNo', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              keyboardType="numeric"
              onFocus={() => setShiftLayout(true)}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={[styles.mainBtn, { backgroundColor: colors.primary }]}
              onPress={() => handleSubmit()}
            >
              <Text style={[styles.mainText, { color: colors.textWhite }]}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secBtn}
              onPress={() => {
                setShiftLayout(false);
                navigation.goBack();
              }}
            >
              <Text style={[styles.text, { color: colors.textSecondary }]}>
                Already a User?
              </Text>
              <Text style={[styles.secText, { color: colors.primary }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    position: 'relative',
    paddingVertical: '18%',
  },
  form: {
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
    fontSize: fonts.btn.primary,
    fontFamily: 'Lato-Bold',
  },
  secBtn: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.text.primary,
  },
  secText: {
    fontSize: fonts.text.primary,
    fontFamily: 'Lato-Bold',
  },
});
