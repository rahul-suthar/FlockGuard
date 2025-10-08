import axios from 'axios';
import { AUTH_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleRegister = async (regForm, showPopup) => {
  try {
    await axios.post(`${AUTH_API_URL}/register`, regForm);
    showPopup({ success: true, msg: 'Registration successfull!' });
  } catch (error) {
    let msg =
      error.response?.data?.message || error.message || 'Registration failed!';
    showPopup({ success: false, msg });
  }
};

const handleLogin = async (logForm, setUser, showPopup) => {
  try {
    const res = await axios.post(`${AUTH_API_URL}/login`, logForm);
    const { user, accessToken, refreshToken } = res?.data?.data || {};

    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    setUser(user);
    showPopup({ success: true, msg: 'Login successfull!' });
  } catch {
    showPopup({ success: false, msg: 'Invalid credentials' });
  }
};

const handleLogOut = async (setUser, showPopup, setShowLoad) => {
  setShowLoad({ show: true, msg: 'Logging Out...' });
  await axios.post(`${AUTH_API_URL}/logout`);

  setShowLoad({ show: true, msg: 'Removing cached data' });

  await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);

  const farmString = await AsyncStorage.getItem('farms');
  if (farmString) await AsyncStorage.removeItem('farms');

  setUser(null);
  showPopup({ success: true, msg: 'Logged out' });
  setShowLoad({ show: false, msg: '' });
};

const updateUser = async (form, showPopup, setUser) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const res = await axios.put(`${AUTH_API_URL}/me`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    const { user } = res?.data?.data;
    console.log(user);
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    showPopup({ success: true, msg: 'Profile Updated!...' });
    return;
  } catch (err) {
    console.log(err);
    showPopup({ success: false, msg: 'Failed to Update' });
    throw err;
  }
};

export { handleRegister, handleLogin, handleLogOut, updateUser };
