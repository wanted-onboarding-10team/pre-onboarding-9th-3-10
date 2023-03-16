import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import {
  Cell,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import { DataType } from 'types/types';
import { StyledTooltip, StyledHead } from 'styles/style';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <StyledTooltip className='custom-tooltip'>
        <p>지역 : {item.id}</p>
        <p>Area : {item.value_area}</p>
        <p>Bar : {item.value_bar}</p>
      </StyledTooltip>
    );
  }
  return null;
};

function Main() {
  const data = useLoaderData() as DataType[];

  const ids = data.map(item => item.id);
  const region = Array.from(new Set<string>(ids));

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setSearchParams({ id: eventValue });
  };

  const handleClick = (data: any) => {
    setSearchParams({ id: data.id });
  };

  return (
    <>
      <StyledHead>
        <span>지역 선택</span>
        {region.map(item => (
          <label key={item}>
            <input
              type='radio'
              name='region'
              onChange={OnChange}
              value={item}
              checked={id === item ? true : false}
            />

            <span>{item}</span>
          </label>
        ))}
        <button onClick={() => setSearchParams()}>해제</button>
      </StyledHead>
      <ComposedChart
        data={data}
        width={1000}
        height={500}
        margin={{
          top: 50,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey='time' scale='band' />
        <YAxis
          dataKey='value_area'
          orientation='left'
          label={{ value: 'area', offset: 30, angle: 0, position: 'top' }}
        />
        <YAxis
          dataKey='value_bar'
          yAxisId='right'
          orientation='right'
          label={{ value: 'bar', offset: 30, angle: 0, position: 'top' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area type='monotone' dataKey='value_area' fill='#A8FFA2' stroke='#A8FFA2' />
        <Bar dataKey='value_bar' yAxisId='right' barSize={5} onClick={handleClick}>
          {data.map((item, index) => (
            <Cell
              cursor='pointer'
              fill={item.id === id ? '#0CD9E8' : '#E6E6E6'}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </ComposedChart>
    </>
  );
}
export default Main;
