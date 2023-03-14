import { useEffect, useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getChartData } from 'utils/api';
import { ChartData } from 'utils/type';

interface ChartDataArray extends ChartData {
  time: string;
}

const ChartArea = () => {
  const [data, setData] = useState<ChartDataArray[]>();

  useEffect(() => {
    (async () => {
      const apiData = await getChartData();
      const convertData: ChartDataArray[] = Object.entries(apiData).map(item => {
        return { time: item[0], ...item[1] };
      });
      setData(convertData);
    })();
  }, []);
  return (
    <ResponsiveContainer minHeight='80vh'>
      {data ? (
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' padding='gap' />
          <YAxis yAxisId='area'>
            <Label value='Area' angle={-90} position='left' />
          </YAxis>
          <YAxis yAxisId='bar' orientation='right'>
            <Label value='Bar' angle={90} position='right' />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign='bottom' align='left' />
          <Area
            yAxisId='area'
            type='monotone'
            dataKey='value_area'
            fill='#8884d8'
            stroke='#8884d8'
            fillOpacity={1}
            name='Area'
          />
          <Bar
            yAxisId='bar'
            name='Bar'
            dataKey='value_bar'
            barSize={20}
            fill='#c73866'
            fillOpacity={0.8}
          />
        </ComposedChart>
      ) : (
        <div>loading...</div>
      )}
    </ResponsiveContainer>
  );
};

export default ChartArea;
