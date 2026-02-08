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

  const Label = ({ text }) => (
    <Text style={[styles.label, { color: colors.textSecondary }]}>{text}</Text>
  );

  const handleDataChange = (field, text) => {
    if (field === 'mobileNo') {
      const cleanNum = text.replace(/[^0-9]/g, '');
      setForm(prev => ({
        ...prev,
        phone: { ...prev.phone, mobileNo: cleanNum },
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: text }));
    }
  };

  const handleSubmit = async () => {
    if (form.name === user.name && form.phone.mobileNo == user.phone.mobileNo && form.language === user.language) {
      setOpenForm(false);
      return;
    }
    if (!form.name.trim() || !form.language.trim()) {
      showPopup({ success: false, msg: 'Please fill all fields' });
      return;
    }
    
    setShowLoad({ show: true, msg: 'Saving changes...' });
    try {
      await updateUser(form, showPopup, setUser);
      setOpenForm(false);
      resetForm();
    } catch (err) {
      showPopup({ success: false, msg: 'Update failed' });
    } finally {
      setShowLoad({ show: false, msg: '' });
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={[styles.formCard, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.formHead, { color: colors.textPrimary }]}>Edit Profile</Text>
        
        <View style={styles.inputGroup}>
          <Label text="Full Name" />
          <TextInput
            placeholderTextColor={colors.textSecondary}
            value={form.name}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            onChangeText={text => handleDataChange('name', text)}
          />

          <Label text="Mobile Number" />
          <TextInput
            placeholderTextColor={colors.textSecondary}
            value={String(form.phone.mobileNo)}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            keyboardType="phone-pad"
            onChangeText={num => handleDataChange('mobileNo', num)}
          />

          <Label text="Preferred Language" />
          <TextInput
            placeholderTextColor={colors.textSecondary}
            value={form.language}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            onChangeText={text => handleDataChange('language', text)}
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.input }]}
            onPress={() => setOpenForm(false)}
          >
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.actionText, { color: colors.textWhite }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center',
    paddingTop: 26,
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  formCard: {
    width: '85%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  formHead: {
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    marginLeft: 4,
    marginTop: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
});