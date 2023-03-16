import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getChart } from 'api/api';
import type { Chart, ChartResponse } from 'types/Chart';

const useChart = () => {
  const [chartData, setChartData] = useState<Chart[]>([]);

  const locations = useMemo(() => {
    if (!chartData) return [];
    return [...new Set(chartData.map(data => data.id)), 'Resert'];
  }, [chartData]);

  useEffect(() => {
    (async () => {
      const data = await getChart();
      const newData = Object.entries(data as ChartResponse)?.map(
        ([day, { id, value_area, value_bar }]) => ({
          day: dayjs(day).format('HH:mm'),
          id,
          value_area,
          value_bar,
          value_day: day,
        }),
      );
      setChartData(newData);
    })();
  }, []);
  return { data: chartData, locations: locations };
};

export default useChart;
