import { ChartDataArray } from 'App';
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartAreaParam {
  chartData: ChartDataArray[];
  clickedId: string | null;
  changeClickedIdByValue: (value: string) => void;
}

const ChartArea = ({ chartData, clickedId, changeClickedIdByValue }: ChartAreaParam) => {
  return (
    <ResponsiveContainer minHeight='80vh'>
      <ComposedChart
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        onClick={state => {
          const { activePayload } = state;
          if (activePayload && activePayload.length > 0) {
            changeClickedIdByValue(activePayload[0].payload.id);
          }
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
        <Tooltip
          labelFormatter={(label, payload) => {
            if (payload && payload.length > 0) {
              return `[${label}] : ${payload[0].payload.id}`;
            }
            return label;
          }}
        />
        <Legend verticalAlign='bottom' align='left' />
        <Area
          yAxisId='area'
          type='monotone'
          dataKey='value_area'
          fill='#FFBF00'
          stroke='#FFAC1C'
          fillOpacity={0.8}
          name='Area'
        />
        <Bar
          yAxisId='bar'
          name='Bar'
          dataKey='value_bar'
          barSize={10}
          stroke='#50C878'
          fill='#50C878'
        >
          {chartData?.map(entry => (
            <Cell
              key={entry.time}
              fill={clickedId === entry.id ? '#50C878' : 'rgba(80, 200, 120, 0.4)'}
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ChartArea;
