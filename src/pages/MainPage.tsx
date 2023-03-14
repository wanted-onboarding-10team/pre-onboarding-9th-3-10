import React, { useState, useEffect } from 'react';
import { Checkbox, Stack } from '@chakra-ui/react';
import CustomTooltip from 'components/CustomTooltip';
import { useLoaderData } from 'react-router-dom';

import { Data, OriginData } from 'types/types';
import MainChart from 'components/MainChart';
import IdCheckboxs from './../components/Checkboxs';

const MainPage = () => {
  const orginData = useLoaderData() as OriginData;
  const [datas, setDatas] = useState<Data[]>([]);
  const [locals, setLocals] = useState<string[]>([]);
  const [bChecked, setChecked] = useState(false);

  const keys = Object.keys(orginData);
  const val = Object.values(orginData);

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        return {
          ...e,
          date: keys[idx].split(' ')[1],
          value_bar: val[idx].value_bar / 100, //data Normalization to kilo
        };
      }),
    );
  }, []);

  useEffect(() => {
    const setID: Set<string> = new Set();
    datas.forEach(e => setID.add(e.id));
    setLocals([...Array.from(setID)]);
  }, [datas]);

  const checkHandler = (e: React.ChangeEvent) => {
    -1;
  };

  return (
    <>
      <div>2023-02-01</div>
      <Stack spacing={5} direction='row'>
        {locals.map(element => (
          <IdCheckboxs key={element + 'keys'} element={element} checkHandler={checkHandler} />
        ))}
      </Stack>
      <MainChart datas={datas} />
    </>
  );
};

export default MainPage;
