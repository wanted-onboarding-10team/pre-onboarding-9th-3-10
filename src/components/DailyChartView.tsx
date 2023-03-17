import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import ChartArea from 'components/chart/ChartArea';
import FilterButtons from 'components/chart/FilterButtons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChartData } from 'types/types';

interface DailyChartViewProps {
  day: string;
  chartDatas: ChartData[];
}

const DailyChartView = ({ day, chartDatas }: DailyChartViewProps) => {
  const [query, setQuery] = useSearchParams();

  const idRange = chartDatas.reduce<string[]>((acc, cur) => {
    acc.includes(cur.id) ? acc : acc.push(cur.id);
    return acc;
  }, []);

  const [idSelect, setIdSelect] = useState<string[]>([]);

  useEffect(() => {
    const arr = query.get('check')?.split('_');
    arr?.pop();
    if (arr !== undefined) {
      setIdSelect([...arr]);
    }
  }, [query]);

  return (
    <>
      <Heading size={'lg'}>{day}</Heading>
      <Text marginBottom={2}>{day} 에 수집된 정보 시각화 차트</Text>
      <Flex direction='column'>
        <Text marginBottom='1' fontSize='.9rem' color='gray.400' fontWeight='700'>
          ID 필터링
        </Text>
        <Box borderRadius='lg' borderWidth='1px' p='2'>
          <Stack spacing={5} direction='row'>
            <FilterButtons idRange={idRange} onChange={setIdSelect} idSelect={idSelect} />
          </Stack>
        </Box>
      </Flex>
      <ChartArea key={day} datas={chartDatas} onChange={setIdSelect} idSelect={idSelect} />
    </>
  );
};

export default DailyChartView;
