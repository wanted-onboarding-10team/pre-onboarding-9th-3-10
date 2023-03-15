import React, { useState, useEffect } from 'react';
import { Box, CheckboxGroup, Heading, Stack } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Data, OriginData } from 'types/types';
import MainChart from 'components/MainChart';
import IdCheckboxs from 'components/Checkboxs';
import MainLayout from './../components/common/MainLayout';

const MainPage = () => {
  const orginData = useLoaderData() as OriginData;

  const [datas, setDatas] = useState<Data[]>([]);
  const [locals, setLocals] = useState<string[]>([]);
  const [idSelect, setIdSelect] = useState<string[]>([]);

  const keys = Object.keys(orginData);
  const val = Object.values(orginData);
  const [date, _] = keys[0].split(' ');

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        const [_, time] = keys[idx].split(' ');
        return {
          ...e,
          date: time,
          value_bar: val[idx].value_bar / 100, //Data Normalization
        };
      }),
    );
  }, []);

  useEffect(() => {
    const deduplID: Set<string> = new Set();
    datas.forEach(e => deduplID.add(e.id));
    setLocals([...Array.from(deduplID)]);
  }, [datas]);

  return (
    <MainLayout>
      <Heading>{date}</Heading>
      <Box borderRadius='lg' borderWidth='1px' p='2'>
        <Stack spacing={5} direction='row'>
          <CheckboxGroup colorScheme={'green'} onChange={(value: string[]) => setIdSelect(value)}>
            {locals.map(element => (
              <IdCheckboxs key={element + 'keys'} element={element} />
            ))}
          </CheckboxGroup>
        </Stack>
      </Box>
      <MainChart datas={datas} idSelect={idSelect} />
    </MainLayout>
  );
};

export default MainPage;
