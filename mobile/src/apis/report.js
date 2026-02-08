import api from './api';

const fetchReports = async farmId => {
  try {
    const res = await api.get(`/${farmId}/reports`);
    return res.data.data.docs;
  } catch (err) {
    console.error('Fetch error:', err.message);
    return [];
  }
};

const createReport = async (farmId, photoPath) => {
  const formData = new FormData();

  formData.append('symptomsImg', {
    uri: photoPath,
    type: 'image/jpeg',
    name: 'symptoms.jpg',
  });

  try {
    const res = await api.post(`/${farmId}/reports`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.data;
  } catch (err) {
    console.log('Error Source:', err.response?.headers['server'] || 'Unknown');
    console.log('Error Data:', err.response?.data);
    throw err;
  }
};

export { fetchReports, createReport };
