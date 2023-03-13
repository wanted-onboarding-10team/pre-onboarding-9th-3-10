import client from 'utils/api/client';

export const getChartDataApi = async () => {
  return await client.get(`/data/mock_data_examples-flexsys.json`);
};
