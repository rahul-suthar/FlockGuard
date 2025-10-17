import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fonts } from '../constants/fontSize';
import { useCustomState } from '../hooks/state';
import { farmOptions } from '../constants/options.js';
import { addFarm } from '../apis/farm.js';
import { usePopup } from '../context/Popup.context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../context/Loader.context.js';
import { useTheme } from '../context/Theme.context.js';

const formData = {
  name: '',
  size: 0,
  location: '',
  type: '',
};

const FarmInput = ({ setFarms, setOpenForm }) => {
  const [form, setForm, resetForm] = useCustomState(formData);
  const { setShowLoad } = useLoader();
  const { showPopup } = usePopup();
  const colors = useTheme();

  const handleDataChange = (field, text) => {
    setForm(prev => ({ ...prev, [field]: text }));
  };

  const updateFarms = async () => {
    const newFarm = await addFarm(form, showPopup);
    setFarms(prev => {
      const updatedFarms = [...prev, newFarm];
      AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));
      return updatedFarms;
    });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.location.trim() || !form.type.trim()) {
      showPopup({
        success: false,
        msg: 'All fields are required.',
      });
      return;
    }
    if (form.size <= 0) {
      showPopup({ success: false, msg: 'Size must be greater than 0.' });
      return;
    }
    setShowLoad({ show: true, msg: 'Adding Farm' });
    try {
      await updateFarms();
      setOpenForm(false);
      resetForm();
    } finally {
      setShowLoad({ show: false, msg: '' });
    }
  };

  return (
    <View style={[styles.form, { backgroundColor: colors.appBg }]}>
      <Text style={[styles.formHead, { color: colors.textPrimary }]}>
        Farm Details
      </Text>
      <View style={{ gap: 18, width: '90%' }}>
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
          value={form.size}
          placeholder="Size"
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.textPrimary },
          ]}
          keyboardType="numeric"
          onChangeText={num => handleDataChange('size', Number(num))}
        />
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.location}
          placeholder="Location"
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.textPrimary },
          ]}
          onChangeText={text => handleDataChange('location', text)}
        />

        <View style={styles.radioToggle}>
          {farmOptions.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.radio,
                {
                  backgroundColor:
                    form.type === type ? colors.accent : colors.disabled,
                  elevation: form.type === type ? 1 : 0,
                },
              ]}
              onPress={() =>
                form.type !== type
                  ? handleDataChange('type', type)
                  : handleDataChange('type', '')
              }
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Lato-Bold',
                  textTransform: 'capitalize',
                  color: form.type === type ? '' :  colors.textSecondary
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.disabled }]}
            onPress={() => setOpenForm(false)}
          >
            <Text style={[styles.btnText, { color: colors.textSecondary }]}>
              close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.btnText, { color: colors.textWhite }]}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FarmInput;

const styles = StyleSheet.create({
  form: {
    width: 330,
    height: 400,
    position: 'absolute',
    top: 120,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.7,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 16,
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
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  btn: {
    flex: 0.45,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
  },
  radio: {
    paddingVertical: 8,
    borderRadius: 20,
    flex: 0.45,
  },
  radioToggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
