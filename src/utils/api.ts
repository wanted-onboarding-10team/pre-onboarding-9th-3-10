import { APIResponse, ChartDataResponse } from 'utils/type';

const getMockData = async () => {
  const response = fetch('./dummy/mock_data_example-flexsys.json');
  const json = (await response).json() as Promise<APIResponse>;
  return (await json).response;
};

export const getChartData = async (): Promise<ChartDataResponse> => {
  return await getMockData();
};
