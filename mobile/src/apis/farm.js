import api from './api';

export const fetchFarms = async (showPopup) => {
  try {
    const res = await api.get('/');
    return res.data.data.docs;
  } catch (error) {
    showPopup({ success: false, msg: 'Failed to fetch farms' });
    return [];
  }
};

export const addFarm = async (form, showPopup) => {
  try {
    const res = await api.post('/', form);
    showPopup({ success: true, msg: 'Farm added successfully' });
    return res.data.data;
  } catch (error) {
    showPopup({ success: false, msg: 'Failed to add farm' });
    throw error;
  }
};

export const deleteFarm = async (farmId, showPopup) => {
  try {
    const res = await api.delete(`/${farmId}`);
    showPopup({ success: true, msg: 'Farm deleted' });
    return res.data.data;
  } catch (err) {
    showPopup({ success: false, msg: 'Failed to delete' });
    throw err;
  }
};