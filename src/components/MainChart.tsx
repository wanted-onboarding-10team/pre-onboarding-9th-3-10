import React, { useState } from 'react';
import { Bar, XAxis, Tooltip, YAxis, Legend, Area, ComposedChart, Cell, Brush } from 'recharts';
import { Data } from 'types/types';
import CustomTooltip from './CustomTooltip';

const MainChart = ({ datas }: { datas: Data[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const handleBarClick = (data: any, index: number) => {
    setActiveIndex(index);
  };
  return (
    <ComposedChart
      width={2000}
      height={400}
      data={datas}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 80,
      }}
    >
      <Legend verticalAlign='bottom' height={36} />
      <XAxis
        dataKey='date'
        label={{ value: 'date', position: 'insideBottomRight', offset: 0 }}
        scale='auto'
        minTickGap={30}
      />
      <YAxis
        dataKey='value_bar'
        label={{ value: 'value_bar', angle: -90, position: 'insideLeft' }}
      />
      <XAxis hide={true} dataKey='id' />
      <Tooltip position={{ y: -10 }} content={CustomTooltip} wrapperStyle={{ outline: 'none' }} />
      <Area
        type='monotone'
        dataKey='value_area'
        fill='url(#color1)'
        fillOpacity={1}
        stroke='#ffb700'
      />
      <Bar
        dataKey='value_bar'
        onClick={handleBarClick}
        animationEasing={'ease-in-out'}
        fill={'#5388D899'}
        radius={[3, 3, 0, 0]}
      >
        {datas.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={activeIndex === index ? '#F4BE37' : 'url(#color2)'} />
        ))}
      </Bar>
      <Brush dataKey='date' height={30} stroke='#5388D899' />

      <defs>
        <linearGradient id='color1' x1='0' y1='1.5' x2='0' y2='0'>
          <stop offset='30%' stopColor='#f5f6f8' stopOpacity={0.5} />
          <stop offset='95%' stopColor='#ecae11' stopOpacity={0.5} />
        </linearGradient>
        <linearGradient id='color2' x1='0' y1='1.5' x2='0' y2='0'>
          <stop offset='30%' stopColor='#ffffff2d' stopOpacity={0.5} />
          <stop offset='95%' stopColor='#5388D899' stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </ComposedChart>
  );
};

export default MainChart;
