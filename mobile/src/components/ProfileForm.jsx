import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fonts } from '../constants/fontSize';
import { useCustomState } from '../hooks/state.js';
import { usePopup } from '../context/Popup.context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../context/Loader.context.js';
import { useAuth } from '../context/Auth.context.js';
import { useTheme } from '../context/Theme.context.js';
import { updateUser } from '../apis/auth.js';

const ProfileForm = ({ setOpenForm }) => {
  const colors = useTheme();
  const { user, setUser } = useAuth();
  const [form, setForm, resetForm] = useCustomState({
    name: user.name,
    phone: {
      code: +91,
      mobileNo: user.phone.mobileNo,
    },
    language: user.language,
  });
  const { setShowLoad } = useLoader();
  const { showPopup } = usePopup();

  const handleDataChange = (field, text) => {
    if (field === 'mobileNo') {
      setForm(prev => ({
        ...prev,
        phone: {
          ...prev.phone,
          mobileNo: Number(text),
        },
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: text }));
    }
  };

  const handleSubmit = async () => {
    if (
      form.name == user.name &&
      form.phone.mobileNo == user.phone.mobileNo &&
      form.language == user.language
    ) {
      setOpenForm(false);
      return;
    }
    if (!form.name.trim() || !form.language.trim()) {
      showPopup({
        success: false,
        msg: 'Insufficient Data',
      });
      return;
    }
    if (form.phone.mobileNo <= 999999999) {
      showPopup({ success: false, msg: 'Invalid Mobile Number.' });
      return;
    }
    setShowLoad({ show: true, msg: 'Updating user info' });
    try {
      await updateUser(form, showPopup, setUser);
      setOpenForm(false);
      resetForm();
    } finally {
      setShowLoad({ show: false, msg: '' });
    }
  };

  return (
    <View style={[styles.form, { backgroundColor: colors.appBg }]}>
      <Text style={[styles.formHead, { color: colors.textPrimary }]}>
        Edit Profile
      </Text>
      <View style={{ gap: 24, width: '90%' }}>
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.name}
          placeholder="Name"
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.textPrimary },
          ]}
          onChangeText={text => handleDataChange('name', text)}
        />
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={String(form.phone.mobileNo)}
          placeholder="Mobile No."
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.textPrimary },
          ]}
          keyboardType="numeric"
          onChangeText={num => handleDataChange('mobileNo', num)}
        />
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.language}
          placeholder="Language"
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.textPrimary },
          ]}
          onChangeText={text => handleDataChange('language', text)}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.accent }]}
            onPress={() => setOpenForm(false)}
          >
            <Text style={[styles.actionText, { color: colors.appBg }]}>
              close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={() => handleSubmit()}
          >
            <Text style={[styles.actionText, { color: colors.textWhite }]}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  form: {
    width: 330,
    height: 400,
    position: 'absolute',
    top: 120,
    left: 40,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.7,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
  },
  formHead: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.head.secondary.dark,
  },
  input: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 42,
    borderRadius: 50,
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
  },
  btnContainer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  actionBtn: {
    flex: 0.45,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
  },
});
