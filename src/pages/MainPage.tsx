import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { ChartData, MockData } from 'types/types';
import MainChart from 'components/MainChart';
import MainLayout from 'components/common/MainLayout';
import FilterButtons from 'components/FilterButtons';

const MainPage = () => {
  const mockData = useLoaderData() as MockData;
  const [query, setQuery] = useSearchParams();

  const [chartData, setDatas] = useState<ChartData[]>([]);
  const [category, setChartData] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const keys = Object.keys(mockData);
  const val = Object.values(mockData);
  const [date] = keys[0].split(' ');

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        const [_, time] = keys[idx].split(' ');
        return {
          ...e,
          date: time,
          value_bar: val[idx].value_bar / 100, //ChartData Normalization
        };
      }),
    );
  }, []);

  useEffect(() => {
    const deduplID = chartData.reduce<string[]>((acc, cur) => {
      acc.includes(cur.id) ? acc : acc.push(cur.id);
      return acc;
    }, []);
    setChartData(deduplID);
  }, [chartData]);

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
              category={category}
              onChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </Stack>
        </Box>
      </Flex>
      <MainChart
        chartData={chartData}
        onChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </MainLayout>
  );
};

export default MainPage;
