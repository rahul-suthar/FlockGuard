import axios from 'axios';
import { AUTH_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleRegister = async (regForm, resetRegForm, showPopup) => {
  try {
    await axios.post(`${AUTH_API_URL}/register`, regForm);
    showPopup({ success: true, msg: 'Registration successfull!' });
  } catch (error) {
    let msg =
      error.response?.data?.message || error.message || 'Registration failed!';
    showPopup({ success: false, msg });
  } finally {
    resetRegForm();
  }
};

const handleLogin = async (logForm, resetLogForm, setUser, showPopup) => {
  try {
    const res = await axios.post(`${AUTH_API_URL}/login`, logForm);
    const { user, accessToken, refreshToken } = res?.data?.data || {};

    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    setUser(user);
    showPopup({ success: true, msg: 'Login successfull!' });
  } catch (error) {
    let msg = error.response?.data?.message || error.message || 'Login failed!';
    showPopup({ success: false, msg });
  } finally {
    resetLogForm();
  }
};

const handleLogOut = async (setUser, showPopup) => {
  await axios.post(`${AUTH_API_URL}/logout`);

  await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
  setUser(null);
  showPopup({success: true, msg: 'Logged out'})
};

export { handleRegister, handleLogin, handleLogOut };
