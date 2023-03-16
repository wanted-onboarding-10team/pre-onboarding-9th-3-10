import { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Data, OriginData } from 'types/types';

const useData = () => {
  const orginData = useLoaderData() as OriginData;
  const [chartData, setChartData] = useState<Data[]>([]);

  const keys = Object.keys(orginData);
  const val = Object.values(orginData);
  const [yearMonthDay] = keys[0].split(' ');

  useEffect(() => {
    const newData = val.map((e, idx) => {
      const [_, time] = keys[idx].split(' ');
      return {
        ...e,
        date: time,
        value_bar: val[idx].value_bar / 100, //Data Normalization
      };
    });
    setChartData([...newData]);
  }, []);
  return { datas: chartData, yearMonthDay };
};

export default useData;
