import MainLayout from 'components/common/MainLayout';
import DailyChartView from 'components/DailyChartView';
import { useLoaderData } from 'react-router-dom';
import { ChartDataByDay } from 'types/types';

const MainPage = () => {
  const chartData = useLoaderData() as ChartDataByDay;
  return (
    <MainLayout>
      <>
        {Object.entries(chartData).map(([day, chartDatasByDay]) => (
          <DailyChartView key={day} day={day} chartDatas={chartDatasByDay} />
        ))}
      </>
    </MainLayout>
  );
};

export default MainPage;
