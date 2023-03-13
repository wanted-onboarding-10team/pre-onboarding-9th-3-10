import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  Legend,
  Area,
  ComposedChart,
  Cell,
  TooltipProps,
  Brush,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Data, OriginData } from 'types/types';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <div>custom tooltip</div>
        <p className='label'>{`${label} : ${payload?.[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const MainPage = () => {
  const [datas, setDatas] = useState<Data[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const orginData = useLoaderData() as OriginData;
  const keys = Object.keys(orginData);
  const val = Object.values(orginData);

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        return {
          ...e,
          date: keys[idx].split(' ')[1],
          value_bar: val[idx].value_bar / 100, //data Normalization to kilo
        };
      }),
    );
  }, []);

  const handleBarClick = (data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div>2023-02-01</div>
      <ResponsiveContainer width={2000} height={400}>
        <ComposedChart
          width={500}
          height={400}
          data={datas}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 80,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
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
          <Tooltip position={{ y: -10 }} />
          <Legend />

          <Bar
            dataKey='value_bar'
            onClick={handleBarClick}
            animationEasing={'ease-in-out'}
            barSize={12}
          >
            {datas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={activeIndex === index ? '#00C49F' : '#413ea0'} />
            ))}
          </Bar>
          <Bar dataKey='id' />
          <Area type='monotone' dataKey='value_area' fill='#c2c2c2' stroke='#8884d8' />
          <Legend />
          <Brush dataKey='date' height={30} stroke='#b8b8b8' />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default MainPage;
