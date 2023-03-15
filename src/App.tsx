import { Chart, MainLayout } from 'components';
import { useEffect, useState } from 'react';
import { ChartDataType, MockDataType } from 'types/data';
import { getMockDataApi } from 'utils/api/chart';
import { useNavigate } from 'react-router-dom';
import * as S from 'style/FilterCategory';

function App() {
  const navigate = useNavigate();

  const [mockData, setMockData] = useState<ChartDataType[]>();
  const [chartData, setChartData] = useState<ChartDataType[]>();

  const filteringData = mockData?.map(item => item.id) ?? [];
  const category = filteringData.filter((item, index) => filteringData.indexOf(item) === index);

  const [filterId, setFilterId] = useState<string | null>();
  const searchParams = new URLSearchParams(location.search);

  const getMockData = async () => {
    const data: MockDataType = await getMockDataApi();
    const dataArray: ChartDataType[] = Object.entries(data).map(
      ([time, { id, value_area, value_bar }]) => ({
        time,
        id,
        value_area,
        value_bar,
      }),
    );
    setMockData(dataArray);
    setChartData(dataArray);
  };

  useEffect(() => {
    getMockData();
  }, []);

  useEffect(() => {
    filterId
      ? setChartData(mockData?.filter(v => v.id === category[Number(filterId)]))
      : setChartData(mockData);
  }, [filterId]);

  useEffect(() => {
    setFilterId(searchParams.get('id'));
  }, [searchParams]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) navigate(`/charts?id=${id}`);
    else {
      navigate(`/`);
    }
  };

  return (
    <MainLayout>
      <S.Category>
        {category.map((id, idx) => (
          <div key={idx}>
            <input
              type='checkbox'
              id={id}
              value={idx}
              onChange={e => handleFilter(e, idx)}
              checked={filterId !== null && idx === Number(filterId)}
            />
            <label htmlFor={id}>{id}</label>
          </div>
        ))}
      </S.Category>
      <Chart data={chartData} />
    </MainLayout>
  );
}

export default App;
