import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartDataType } from 'types/data';

interface ChartProps {
  data?: ChartDataType[];
}
const Chart = ({ data }: ChartProps) => {
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload) {
      return (
        <div className='custom-tooltip'>
          <div>{`ID: ${payload[0].payload.id}`}</div>
          <div>{`value_bar: ${payload[0].value}`}</div>
          <div>{`value_area: ${payload[1].value}`}</div>
        </div>
      );
    }
    return null;
  };

  return data ? (
    <ComposedChart width={1400} height={800} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis dataKey='value_bar' tickCount={8} />
      <YAxis dataKey='value_bar' tickCount={8} />
      <Tooltip content={<CustomTooltip />} contentStyle={{ backgroundColor: '#fff' }} />

      <Legend />

      <Bar type='monotone' dataKey='value_bar' fill='#82ca9d' />
      <Area type='monotone' dataKey='value_area' stroke='#8884d8' />
    </ComposedChart>
  ) : (
    <p>loading</p>
  );
};

export default Chart;
