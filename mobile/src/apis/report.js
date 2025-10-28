import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FARM_API_URL } from '@env';

const fetchReports = async farmId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const res = await axios.get(`${FARM_API_URL}/${farmId}/reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.docs;
  } catch (err) {
    console.error('Failed to fetch farms:', err);
    showPopup({ success: false, msg: 'failed to fetch Farms' });
    return [];
  }
};

const createReport = async (farmId, photoPath) => {
  const formData = new FormData();
  formData.append('symptomsImg', {
    uri: photoPath,
    type: 'image/jpeg',
    fileName: 'symptoms.jpg',
  });

  console.log(formData);
  console.log(photoPath);
  console.log(farmId);

  try {
    const token = await AsyncStorage.getItem('accessToken');
    const res = await axios.post(
      `${FARM_API_URL}/${farmId}/reports`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        transformRequest: x => x,
      },
    );
    console.log(res);

    return res.data.data;
  } catch (err) {
    console.log(err);
    console.error('Upload error:', err.response?.data || err.message);
    throw err;
  }
};

export { fetchReports, createReport };
