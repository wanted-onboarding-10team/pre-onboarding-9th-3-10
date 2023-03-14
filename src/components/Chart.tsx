import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartDataType } from 'types/data';

interface ChartProps {
  data?: ChartDataType[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <LineChart width={1400} height={700} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='value_area' stroke='#8884d8' />
      <Line type='monotone' dataKey='value_bar' stroke='#82ca9d' />
    </LineChart>
  );
};

export default Chart;
