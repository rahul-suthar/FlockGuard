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
import { Picker } from '@react-native-picker/picker';
import { roleOptions } from '../constants/roles.js';
import { handleRegister } from '../apis/auth.js';
import { useCustomState } from '../hooks/state.js';
import { usePopup } from '../context/PopupContext.js';

const Register = ({ navigation }) => {
  const { showPopup } = usePopup();
  const [regForm, setRegForm, resetRegForm] = useCustomState({
    name: '',
    email: '',
    password: '',
    phone: {
      code: '+91',
      mobileNo: 1234567890,
    },
    role: '',
  });

  const handleDataChange = (field, text) => {
    setRegForm(prev => ({ ...prev, [field]: text }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.headText}>Register</Text>
          <View style={{ gap: 30, alignItems: 'center' }}>
            <TextInput
              style={styles.inputs}
              placeholder="name"
              value={regForm.name}
              onChangeText={text => handleDataChange('name', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputs}
              placeholder="email"
              placeholderTextColor={colors.textSecondary}
              value={regForm.email}
              onChangeText={text => handleDataChange('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.inputs}
              placeholder="password"
              value={regForm.password}
              onChangeText={text => handleDataChange('password', text)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <View style={[styles.inputs, { paddingVertical: 0 }]}>
              <Picker
                selectedValue={regForm.role}
                onValueChange={value => handleDataChange('role', value)}
                placeholderTextColor={colors.textSecondary}
                dropdownIconColor={colors.textSecondary}
                mode="dropdown"
              >
                <Picker.Item
                  label="Select role..."
                  value=""
                  enabled={false}
                  color={colors.textSecondary}
                />
                {roleOptions.map(option => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    style={styles.picker}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.mainBtn}
              onPress={() => handleRegister(regForm, resetRegForm, showPopup)}
            >
              <Text style={styles.mainText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.text}>Already a User?</Text>
              <Text style={styles.secText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.appBg,
    position: 'relative',
  },
  form: {
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
  picker: {
    backgroundColor: colors.input,
    color: colors.primary,
    margin: 3,
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
