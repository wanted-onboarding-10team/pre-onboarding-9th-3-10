import { fetchData } from 'utils/fetch';

export const rootLoader = async () => {
  const mockData = await fetchData('data/mock_data_example.json');
  const convertObjectToArray = Object.keys(mockData).map(item => {
    return { name: item, ...mockData[item] };
  });
  return convertObjectToArray;
};
