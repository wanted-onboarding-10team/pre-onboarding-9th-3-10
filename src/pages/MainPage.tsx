import DailyChart from 'components/chart/DailyChart';
import MainLayout from 'components/common/MainLayout';
import { useLoaderData } from 'react-router-dom';
import { ChartDataByDay } from 'types/types';

const MainPage = () => {
  const chartData = useLoaderData() as ChartDataByDay;
  const chartDays = Object.keys(chartData);
  const showDay = chartDays[chartDays.length - 1];

  return (
    <MainLayout>
      <DailyChart key={showDay} day={showDay} chartDatas={chartData[showDay]} />
    </MainLayout>
  );
};

export default MainPage;
