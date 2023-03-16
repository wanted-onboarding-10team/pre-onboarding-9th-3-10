import { getChartDataApi } from 'utils/api/chart';

const mainLoader = async () => {
  const {
    data: { response },
  } = await getChartDataApi();

  const convertObjectToArray = Object.keys(response).map(mockDataKey => {
    const { value_bar } = response[mockDataKey];
    return { ...response[mockDataKey], date: mockDataKey, value_bar: value_bar / 1000 };
  });

  return convertObjectToArray;
};
export default mainLoader;
