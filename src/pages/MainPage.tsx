import React, { useState, useEffect } from 'react';
import { Box, CheckboxGroup, Heading, Stack } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Data, OriginData } from 'types/types';
import MainChart from 'components/MainChart';
import IdCheckboxs from 'components/Checkboxs';
import MainLayout from 'components/common/MainLayout';

const MainPage = () => {
  const orginData = useLoaderData() as OriginData;
  const [query, setQuery] = useSearchParams();

  const [datas, setDatas] = useState<Data[]>([]);
  const [idRange, setIdRange] = useState<string[]>([]);
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

  const onSelect = (value: string[]) => {
    let str = 'check=';
    value.forEach(e => (str = str.concat(e, '_')));
    setQuery(str);
  };

  return (
    <MainLayout>
      <Heading>{date}</Heading>
      <Box borderRadius='lg' borderWidth='1px' p='2'>
        <Stack spacing={5} direction='row'>
          <CheckboxGroup
            colorScheme={'yellow'}
            onChange={(value: string[]) => onSelect(value)}
            value={[...idSelect]}
          >
            {idRange.map(element => {
              return <IdCheckboxs key={element} element={element} />;
            })}
          </CheckboxGroup>
        </Stack>
      </Box>
      <MainChart datas={datas} idSelect={idSelect} />
    </MainLayout>
  );
};

export default MainPage;
