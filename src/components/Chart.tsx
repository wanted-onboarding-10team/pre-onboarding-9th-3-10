import { Area, Bar, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartDataType } from 'types/data';

interface ChartProps {
  data?: ChartDataType[];
}

const Chart = ({ data }: ChartProps) => {
  return data ? (
    <ComposedChart width={1400} height={800} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis dataKey='value_bar' tickCount={8} />
      <YAxis dataKey='value_bar' tickCount={8} />
      <Tooltip />
      <Legend />

      <Bar type='monotone' dataKey='value_bar' fill='#82ca9d' />
      <Area type='monotone' dataKey='value_area' stroke='#8884d8' />
    </ComposedChart>
  ) : (
    <p>loading</p>
  );
};

export default Chart;
