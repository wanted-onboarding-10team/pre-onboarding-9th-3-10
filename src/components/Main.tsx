import React, { PureComponent } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  LineChart,
  Line,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { DataType } from 'types/types';

function Main() {
  const data = useLoaderData() as DataType[];

  console.log(data);

  return (
    <>
      hello
      {/* <ResponsiveContainer width='100%' height='100%'> */}
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
        <Tooltip />
        <Legend />

        <Bar dataKey='value_bar' yAxisId='right' barSize={5} fill='#82ca9d' />
        <Area type='monotone' dataKey='value_area' fill='#8884d8' stroke='#8884d8' />
      </ComposedChart>
      {/* </ResponsiveContainer> */}
    </>
  );
}
export default Main;
