import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Area,
  Bar,
  Brush,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MockDataType } from 'types';
import CustomToolip from 'components/graph/tooltip/CutsomToolip';

const Graph = ({ data }: { data: MockDataType[] }) => {
  const [highlightList, setHightlightList] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    const {
      payload: { id }, // 클릭한 지역이름
    } = e.activePayload[0];

    const area = searchParams.get('area')?.split(',');
    //값이 없을 떄
    if (area === undefined) return setSearchParams({ area: id });
    //동일한 값 있을 때 삭제
    if (area.some(area => area === id)) {
      const exceptionArea = area.filter(area => area !== id);
      if (exceptionArea.length === 0) return setSearchParams();
      return setSearchParams({ area: exceptionArea.join(',') });
    }
    // 지역 추가
    setSearchParams({ area: area.join(',') + ',' + id });
  };

  useEffect(() => {
    const area = searchParams.get('area')?.split(',');
    if (area === undefined) return setHightlightList([]);
    setHightlightList([...area]);
  }, [searchParams]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart data={data} onClick={handleClick}>
        <CartesianGrid strokeDasharray='3 3' />
        <Legend />
        <Tooltip content={<CustomToolip />} />
        <XAxis dataKey='name' tickSize={15} />
        <Brush dataKey={'name'} height={30} />
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
          name='value_bar'
          label={{ value: 'value_bar', angle: -90, position: 'insideLeft' }}
        />
        <Bar type='monotone' dataKey='value_bar' yAxisId={1} fill={'#5388D899'}>
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                strokeWidth={highlightList.some(element => element === entry.id) ? 4 : 2}
                fill={
                  highlightList.some(element => element === entry.id)
                    ? '#F4BE37'
                    : 'rgba(44,44,44,0.3)'
                }
              />
            );
          })}
        </Bar>
        <Area
          type='monotone'
          dataKey='value_area'
          stroke='rgb(29,195,187)'
          fill='rgb(248,78,139)'
          strokeWidth={3}
          yAxisId={0}
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                strokeWidth={highlightList.some(element => element === entry.id) ? 4 : 2}
                fill={
                  highlightList.some(element => element === entry.id)
                    ? '#F4BE37'
                    : 'rgba(44,44,44,0.5)'
                }
              />
            );
          })}
        </Area>
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default Graph;
