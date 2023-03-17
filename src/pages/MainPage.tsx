import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { FilterButtons, MainChart, MainLayout } from 'components';
import useChart from 'hooks/useChart';

const MainPage = () => {
  const { datas, days, idRange } = useChart();

  const [query, setQuery] = useSearchParams();
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
      <Heading size={'lg'}>{days}</Heading>
      <Text marginBottom={2}>{days} 에 수집된 정보 시각화 차트</Text>
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
      <MainChart datas={datas} onChange={setIdSelect} idSelect={idSelect} />
    </MainLayout>
  );
};

export default MainPage;
