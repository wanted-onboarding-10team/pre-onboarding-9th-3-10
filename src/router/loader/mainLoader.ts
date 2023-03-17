import { ChartData, ChartDataByDay, ChartDataResponse } from 'types/types';
import { getChartDataApi } from 'utils/api/chart';

const mainLoader = async () => {
  const {
    data: { response },
  } = await getChartDataApi();

  const responseToChartData: ChartData[] = Object.entries(response as ChartDataResponse).map(
    ([key, value]) => {
      const dateTime = key.split(' ');
      return { date: dateTime[0], time: dateTime[1], ...value, value_bar: value.value_bar / 100 };
    },
  );

  const init: ChartDataByDay = {};
  const chartDataByDay = responseToChartData.reduce((prev, curr) => {
    prev[curr.date] = prev[curr.date] || [];
    prev[curr.date].push(curr);
    return prev;
  }, init);

  return chartDataByDay;
};

export default mainLoader;
