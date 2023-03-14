import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { MockDataType } from 'types';

const Graph = ({ data }: { data: MockDataType[] }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart data={data} barCategoryGap='40%'>
        <CartesianGrid strokeDasharray='3 3' />
        <Legend />
        <XAxis dataKey='name' tickSize={15} />
        <YAxis dataKey='value_area' orientation='right' yAxisId={0} />
        <YAxis dataKey='value_bar' orientation='left' yAxisId={1} />
        <Area type='monotone' dataKey='value_area' stroke='#8884d8' fill='#8884d8' yAxisId={0} />
        <Bar dataKey='value_bar' maxBarSize={10} fill='#413ea0' yAxisId={1} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default Graph;
