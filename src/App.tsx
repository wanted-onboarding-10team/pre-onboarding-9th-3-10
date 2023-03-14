import { Chart, MainLayout } from 'components';
import { useEffect, useState } from 'react';
import { ChartDataType, MockDataType } from 'types/data';
import { getMockDataApi } from 'utils/api/chart';

function App() {
  const [mockData, setMockData] = useState<MockDataType>();
  const [chartData, setChartData] = useState<ChartDataType[]>();

  const getMockData = async () => {
    const data = await getMockDataApi();
    setMockData(data);
  };

  useEffect(() => {
    getMockData();
  }, []);

  useEffect(() => {
    if (mockData) {
      const data: ChartDataType[] = Object.entries(mockData).map(
        ([time, { id, value_area, value_bar }]) => ({
          time,
          id,
          value_area,
          value_bar,
        }),
      );
      setChartData(data);
    }
  }, [mockData]);

  return (
    <MainLayout>
      <Chart data={chartData} />
    </MainLayout>
  );
}

export default App;
