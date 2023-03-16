import { useCallback, useState } from 'react';
import ChartList from './components/ChartList';
import Filter from 'components/Filter';
import useChart from './hooks/useChart';
import { ChartDiv } from './styles/Layout';

const App = () => {
  const { data, locations } = useChart();
  const [location, setLocation] = useState('');

  const changeLocation = useCallback((value: string) => {
    setLocation(value);
  }, []);

  return (
    <ChartDiv>
      <ChartList data={data} location={location} changeLocation={changeLocation} />
      <Filter locations={locations} location={location} changeLocation={changeLocation} />
    </ChartDiv>
  );
};

export default App;
