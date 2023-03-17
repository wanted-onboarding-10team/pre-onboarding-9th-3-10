import React, { useEffect, useState } from 'react';
import {
  Area,
  Bar,
  Brush,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CustomTooltip } from 'components';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { ChartData } from 'types/types';

interface MainChartProps {
  chartData: ChartData[];
  selectedCategory: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}
const MainChartColor = {
  yellow: '#ffb700',
  blue: '#5388D899',
  opacityGray: '#ffffff2d',
} as const;

const DataLabel = {
  bar: 'value_bar',
  area: 'value_area',
} as const;

const MainChart = ({ chartData, selectedCategory, onChange }: MainChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number[] | undefined>([]);
  const [brushIndex, setBrushIndex] = useState<number[]>([]);

  useEffect(() => {
    setBrushIndex([0, chartData.length - 1]);
  }, [chartData]);

  useEffect(() => {
    setActiveIndex(
      chartData.reduce<number[]>((acc, cur, idx, arr) => {
        if (selectedCategory.includes(cur.id)) acc.push(idx);
        return acc;
      }, []),
    );
  }, [selectedCategory]);

  const handleChartClick = (data: CategoricalChartState) => {
    if (!data.activePayload) return;

    const {
      payload: { id },
    } = data.activePayload[0];

    if (id !== undefined) {
      if (selectedCategory.includes(id)) {
        onChange(selectedCategory.filter(v => v !== id));
      } else {
        onChange([...selectedCategory, id]);
      }
    }
  };

  return (
    <ResponsiveContainer width='100%' minHeight={400}>
      <ComposedChart
        onClick={handleChartClick}
        width={2000}
        height={400}
        data={chartData}
        margin={{
          top: 40,
          right: 80,
          bottom: 20,
          left: 80,
        }}
      >
        <Legend verticalAlign='bottom' height={36} />
        <Tooltip position={{ y: -10 }} content={CustomTooltip} wrapperStyle={{ outline: 'none' }} />

        <XAxis
          dataKey='time'
          label={{ value: 'time', position: 'left', offset: 6 }}
          scale='auto'
          minTickGap={30}
        />
        <XAxis hide={true} dataKey='id' />
        <YAxis
          yAxisId={DataLabel.bar}
          dataKey={DataLabel.bar}
          orientation='left'
          label={{ value: 'value_bar, Unit : K', position: 'top', offset: 15 }}
        />
        <YAxis
          yAxisId={DataLabel.area}
          dataKey={DataLabel.area}
          orientation='right'
          label={{ value: `value_area`, position: 'top', offset: 15 }}
        />

        <Bar
          yAxisId={DataLabel.bar}
          dataKey={DataLabel.bar}
          fill={MainChartColor.blue}
          radius={[3, 3, 0, 0]}
          animationEasing={'ease-in-out'}
        >
          {chartData.map((entry, index) => {
            if (index >= brushIndex[0] && index <= brushIndex[1]) {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex?.includes(index) ? '#F4BE37' : `url(#${DataLabel.bar})`}
                />
              );
            }
          })}
        </Bar>
        <Area
          yAxisId='value_area'
          dataKey='value_area'
          type='monotone'
          fill={`url(#${DataLabel.area})`}
          fillOpacity={1}
          stroke='#ffb700'
        />

        <Brush dataKey='time' height={30} stroke='#5388D899' />

        <defs>
          <linearGradient id={DataLabel.area} x1='0' y1='1.5' x2='0' y2='0'>
            <stop offset='30%' stopColor='#f5f6f8' stopOpacity={0.5} />
            <stop offset='95%' stopColor={MainChartColor.yellow} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id={DataLabel.bar} x1='0' y1='1.5' x2='0' y2='0'>
            <stop offset='30%' stopColor={MainChartColor.opacityGray} stopOpacity={0.5} />
            <stop offset='95%' stopColor={MainChartColor.blue} stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MainChart;
