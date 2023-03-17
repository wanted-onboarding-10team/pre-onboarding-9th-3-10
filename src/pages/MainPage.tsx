import DailyChart from 'components/chart/DailyChart';
import MainLayout from 'components/common/MainLayout';
import { useLoaderData } from 'react-router-dom';
import { ChartDataByDay } from 'types/types';

const MainPage = () => {
  const chartData = useLoaderData() as ChartDataByDay;

  return (
    <MainLayout>
      <>
        {Object.entries(chartData).map(([day, chartDatasByDay]) => (
          <DailyChart key={day} day={day} chartDatas={chartDatasByDay} />
        ))}
      </>
    </MainLayout>
  );
};

export default MainPage;
