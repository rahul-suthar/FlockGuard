import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fontSize';
import { useCustomState } from '../hooks/state';
import { farmOptions } from '../constants/options.js';
import { addFarm } from '../apis/user.js';
import { usePopup } from '../context/Popup.context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../context/Loader.context.js';

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
    setShowLoad({ show: true, msg: 'Adding Farm'});
    try {
      await updateFarms();
      setOpenForm(false);
      resetForm();
    } finally {
      setShowLoad({ show: false, msg: ''});
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formHead}>Farm Details</Text>
      <View style={{ gap: 24, width: '90%' }}>
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.name}
          placeholder="Name"
          style={styles.input}
          onChangeText={text => handleDataChange('name', text)}
        />
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.size}
          placeholder="Size"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={num => handleDataChange('size', Number(num))}
        />
        <TextInput
          placeholderTextColor={colors.textSecondary}
          value={form.location}
          placeholder="Location"
          style={styles.input}
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
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.error }]}
            onPress={() => setOpenForm(false)}
          >
            <Text style={styles.btnText}>close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.success }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.btnText, { color: colors.textPrimary }]}>
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
    backgroundColor: colors.appBg,
    position: 'absolute',
    top: 120,
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
    color: colors.textPrimary,
    fontFamily: 'Lato-Bold',
    fontSize: fonts.head.secondary.dark,
  },
  input: {
    backgroundColor: colors.input,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 42,
    borderRadius: 50,
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
    color: colors.textPrimary,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  btn: {
    paddingVertical: 8,
    borderRadius: 20,
    flex: 0.45,
    elevation: 1,
  },
  btnText: {
    color: colors.textWhite,
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  radio: {
    paddingVertical: 6,
    borderRadius: 20,
    flex: 0.45,
  },
  radioToggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
