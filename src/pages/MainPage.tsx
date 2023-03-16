import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import MainChart from 'components/MainChart';
import MainLayout from 'components/common/MainLayout';
import FilterButtons from 'components/FilterButtons';
import useData from 'hooks/useData';

const MainPage = () => {
  const { datas, yearMonthDay } = useData();
  const [query, setQuery] = useSearchParams();
  const [idRange, setIdRange] = useState<string[]>([]);
  const [idSelect, setIdSelect] = useState<string[]>([]);

  useEffect(() => {
    const arr = query.get('check')?.split('_');
    arr?.pop();
    if (arr !== undefined) {
      setIdSelect([...arr]);
    }
  }, [query]);

  useEffect(() => {
    const deduplID = datas.reduce<string[]>((acc, cur) => {
      acc.includes(cur.id) ? acc : acc.push(cur.id);
      return acc;
    }, []);
    setIdRange(deduplID);
  }, [datas]);

  return (
    <MainLayout>
      <Heading size={'lg'}>{yearMonthDay}</Heading>
      <Text marginBottom={2}>{yearMonthDay} 에 수집된 정보 시각화 차트</Text>
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
