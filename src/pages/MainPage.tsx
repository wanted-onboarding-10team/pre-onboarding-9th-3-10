import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { FilterButtons, MainLayout, MainChart } from 'components';
import { ChartData } from 'types/types';

const MainPage = () => {
  const mockData = useLoaderData() as ChartData[];

  const [query] = useSearchParams();
  const areaCategory = Array.from(new Set<string>(mockData.map(data => data.id)));
  const [date] = mockData[0].date.split(' ');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategory(query.getAll('check'));
  }, [query]);

  return (
    <MainLayout>
      <Heading size={'lg'}>{date}</Heading>
      <Text marginBottom={2}>{date} 에 수집된 정보 시각화 차트</Text>
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
        chartData={mockData}
        onChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </MainLayout>
  );
};

export default MainPage;
