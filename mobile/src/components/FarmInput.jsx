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
    // Ensure size is always a number or empty string to avoid NaN in TextInput
    if (field === 'size') {
      const numericValue = text.replace(/[^0-9]/g, '');
      setForm(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setForm(prev => ({ ...prev, [field]: text }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.location.trim() || !form.type) {
      showPopup({ success: false, msg: 'Please complete all fields.' });
      return;
    }
    if (Number(form.size) <= 0) {
      showPopup({ success: false, msg: 'Population must be at least 1.' });
      return;
    }

    setShowLoad({ show: true, msg: 'Registering Farm...' });
    try {
      const newFarm = await addFarm(form, showPopup);
      setFarms(prev => {
        const updatedFarms = [...prev, newFarm];
        AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));
        return updatedFarms;
      });
      setOpenForm(false);
      resetForm();
    } catch (err) {
      showPopup({ success: false, msg: 'Failed to add farm.' });
    } finally {
      setShowLoad({ show: false, msg: '' });
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={[styles.formCard, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.formHead, { color: colors.textPrimary }]}>
          New Farm Details
        </Text>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Farm Name (e.g., Green Valley)"
            placeholderTextColor={colors.textSecondary}
            value={form.name}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            onChangeText={text => handleDataChange('name', text)}
          />

          <TextInput
            placeholder="Population (e.g., 500)"
            placeholderTextColor={colors.textSecondary}
            value={String(form.size)}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            keyboardType="numeric"
            onChangeText={num => handleDataChange('size', num)}
          />

          <TextInput
            placeholder="Location (City, State)"
            placeholderTextColor={colors.textSecondary}
            value={form.location}
            style={[styles.input, { backgroundColor: colors.input, color: colors.textPrimary }]}
            onChangeText={text => handleDataChange('location', text)}
          />

          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Select Farm Type</Text>
          <View style={styles.radioToggle}>
            {farmOptions.map((type, index) => {
              const isSelected = form.type === type;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={[
                    styles.radio,
                    { 
                      backgroundColor: isSelected ? colors.primary : colors.input,
                      borderWidth: isSelected ? 0 : 1,
                      borderColor: colors.disabled
                    },
                  ]}
                  onPress={() => handleDataChange('type', isSelected ? '' : type)}
                >
                  <Text style={[
                    styles.radioText,
                    { color: isSelected ? colors.textWhite : colors.textSecondary }
                  ]}>
                    {type === 'pig' ? '🐷 Swine' : '🐔 Poultry'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.input }]}
            onPress={() => setOpenForm(false)}
          >
            <Text style={[styles.btnText, { color: colors.textSecondary }]}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.btnText, { color: colors.textWhite }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FarmInput;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 26,
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  formCard: {
    width: '88%',
    padding: 24,
    borderRadius: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  formHead: {
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    gap: 14,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  sectionLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  radioToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  radio: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioText: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  btnContainer: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
});