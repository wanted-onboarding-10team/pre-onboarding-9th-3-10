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
import * as S from 'style/CustomTooltip';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
interface ChartProps {
  data?: ChartDataType[];
}
const Chart = ({ data }: ChartProps) => {
  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload) {
      return (
        <S.CustomTooltip>
          <div>{`ID: ${payload[0].payload.id}`}</div>
          <div>{`value_bar: ${payload[0].value}`}</div>
          <div>{`value_area: ${payload[1].value}`}</div>
        </S.CustomTooltip>
      );
    }
    return null;
  };

  return data ? (
    <ComposedChart width={1400} height={800} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='time' />
      <YAxis
        dataKey='value_area'
        orientation='right'
        yAxisId={0}
        label={{ value: 'value_area', angle: 90, position: 'insideRight' }}
      />
      <YAxis
        dataKey='value_bar'
        orientation='left'
        yAxisId={1}
        label={{ value: 'value_bar', angle: -90, position: 'insideLeft' }}
      />
      <Tooltip content={<CustomTooltip />} contentStyle={{ backgroundColor: '#fff' }} />

      <Legend />

      <Bar type='monotone' dataKey='value_bar' fill='#82ca9d' yAxisId={1} />
      <Area type='monotone' dataKey='value_area' stroke='#8884d8' />
    </ComposedChart>
  ) : (
    <p>loading</p>
  );
};

export default Chart;
