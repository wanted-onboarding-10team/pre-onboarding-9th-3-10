import React, { useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Chart } from '../types/Chart';
import Category from './Category';
import CustomTooltip from './CustomTooltip';

interface ChartProps {
  data: Chart[];
  location: string;
  changeLocation: (value: string) => void;
}

const ChartList = ({ data, location, changeLocation }: ChartProps) => {
  const [category, setCategory] = useState<string>('TOTAL');

  return (
    <>
      <Category setCategory={setCategory} />
      <ResponsiveContainer width='90%' height={500}>
        <ComposedChart data={data} margin={{ top: 40, right: 40, bottom: 30, left: 40 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis
            dataKey='value_area'
            yAxisId='left'
            orientation='left'
            label={{
              value: 'Area',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <YAxis
            dataKey='value_bar'
            yAxisId='right'
            orientation='right'
            label={{
              value: 'Bar',
              angle: 90,
              position: 'insideRight',
            }}
          />
          {(category === 'TOTAL' || category === 'AREA') && (
            <Area
              yAxisId='left'
              type='monotone'
              dataKey='value_area'
              stroke='#C0C0C0'
              fill='#C0C0C0'
            ></Area>
          )}

          {(category === 'TOTAL' || category === 'BAR') && (
            <Bar
              yAxisId='right'
              data={data}
              dataKey='value_bar'
              fill='#FFE4E1'
              onClick={value => changeLocation(value.id)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.id === location ? '#FFB6C1' : '#FFE4E1'} />
              ))}
            </Bar>
          )}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartList;
