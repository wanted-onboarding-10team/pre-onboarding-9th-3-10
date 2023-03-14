import axios from 'axios';

export const getMockDataApi = async () => {
  const { data } = await axios.get('/data/mock_data_example-flexsys.json');
  return data.response;
};
