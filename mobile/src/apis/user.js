import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FARM_API_URL } from '@env';

const fetchFarms = async showPopup => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(FARM_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.docs;
  } catch (error) {
    console.error('Failed to fetch farms:', error);
    showPopup({ success: false, msg: 'failed to fetch Farms' });
    return [];
  }
};

const addFarm = async (form, showPopup) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(FARM_API_URL, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showPopup({ success: true, msg: 'farm added successfully' });
    return response.data.data;
  } catch (error) {
    showPopup({ success: false, msg: 'Failed to add Farm' });
    throw error;
  }
};

const deleteFarm = async (farmId, showPopup) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${FARM_API_URL}/${farmId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showPopup({ success: true, msg: 'Farm deleted' });
    return response.data.data;
  } catch (err) {
    showPopup({ success: false, msg: 'Failed to delete' });
    throw err;
  }
};

export { fetchFarms, addFarm, deleteFarm };
