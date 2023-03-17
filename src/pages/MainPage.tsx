import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { FilterButtons, MainChart, MainLayout } from 'components';
import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { ChartDataByDay } from 'types/types';

const MainPage = () => {
  const chartData = useLoaderData() as ChartDataByDay;
  const chartDays = Object.keys(chartData);
  const selectedDay = chartDays[chartDays.length - 1];
  const areaCategory = Array.from(new Set<string>(chartData[selectedDay].map(data => data.id)));

  const [query] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategory(query.getAll('check'));
  }, [query]);

  return (
    <MainLayout>
      <Heading size={'lg'}>{selectedDay}</Heading>
      <Text marginBottom={2}>{selectedDay} 에 수집된 정보 시각화 차트</Text>
      <Flex direction='column'>
        <Text marginBottom='1' fontSize='.9rem' color='gray.400' fontWeight='700'>
          ID 필터링
        </Text>
        <Box borderRadius='lg' borderWidth='1px' p='2'>
          <Stack spacing={5} direction='row'>
            <FilterButtons
              areaCategory={areaCategory}
              onChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </Stack>
        </Box>
      </Flex>
      <MainChart
        chartData={chartData[selectedDay]}
        onChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </MainLayout>
  );
};

export default MainPage;
