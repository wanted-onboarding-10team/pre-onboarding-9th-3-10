import axios from 'axios';
import { MockDataType } from 'types/data';

export const getMockDataApi = async (): Promise<MockDataType> => {
  const { data } = await axios.get('/data/mock_data_example-flexsys.json');
  return data.response;
};
