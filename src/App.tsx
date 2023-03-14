import { useCallback, useState } from 'react';
import ChartList from './components/ChartList';
import useChart from './hooks/useChart';

const App = () => {
  const { data } = useChart();
  const [location, setLocation] = useState('');

  const changeLocation = useCallback((value: string) => {
    setLocation(value);
  }, []);

  return <ChartList data={data} location={location} changeLocation={changeLocation} />;
};

export default App;
