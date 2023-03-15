import React, { useState, useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';

import { Data, OriginData } from 'types/types';
import MainChart from 'components/MainChart';
import IdCheckboxs from './../components/Checkboxs';

const MainPage = () => {
  const orginData = useLoaderData() as OriginData;
  const [datas, setDatas] = useState<Data[]>([]);
  const [locals, setLocals] = useState<string[]>([]);

  useEffect(() => {
    const keys = Object.keys(orginData);
    const val = Object.values(orginData);

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
    <>
      <div>2023-02-01</div>
      <Stack spacing={5} direction='row'>
        {locals.map(element => (
          <IdCheckboxs key={element + 'keys'} element={element} />
        ))}
      </Stack>
      <MainChart datas={datas} />
    </>
  );
};

export default MainPage;
