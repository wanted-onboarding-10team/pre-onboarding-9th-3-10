import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import { Data } from 'types/types';
import MainChart from 'components/MainChart';
import MainLayout from 'components/common/MainLayout';
import FilterButtons from 'components/FilterButtons';

const MainPage = () => {
  const mockData = useLoaderData() as Data[];

  const [query, setQuery] = useSearchParams();
  const areaList = Array.from(new Set<string>(mockData.map(data => data.id)));
  const [date] = mockData[0].date.split(' ');
  const [idSelect, setIdSelect] = useState<string[]>([]);

  useEffect(() => {
    const arr = query.get('check')?.split('_');
    arr?.pop();
    if (arr !== undefined) {
      setIdSelect([...arr]);
    }

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
            <FilterButtons areaList={areaList} onChange={setIdSelect} idSelect={idSelect} />
          </Stack>
        </Box>
      </Flex>
      <MainChart datas={mockData} onChange={setIdSelect} idSelect={idSelect} />

    </MainLayout>
  );
};

export default MainPage;
