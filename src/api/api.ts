import axios from 'axios';

export const getChart = async () => {
  const { data } = await axios.get(`data/mock_data_example-flexsys.json`);
  return data.response;
};
