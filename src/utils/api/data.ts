import client from 'utils/api/client';

export const getApi = async () => {
  return await client.get(`/data/mock_data_example-flexsys.json`);
};
