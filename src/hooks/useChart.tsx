import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Data, OriginData } from 'types/types';

const useChart = () => {
  const orginData = useLoaderData() as OriginData;

  const [datas, setDatas] = useState<Data[]>([]);
  const [idRange, setIdRange] = useState<string[]>([]);

  const keys = Object.keys(orginData);
  const val = Object.values(orginData);
  const [days] = keys[0].split(' ');

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        const [_, time] = keys[idx].split(' ');
        return {
          ...e,
          days: time,
          value_bar: val[idx].value_bar / 100, //Data Normalization
        };
      }),
    );
  }, []);

  useEffect(() => {
    const deduplID = datas.reduce<string[]>((acc, cur) => {
      acc.includes(cur.id) ? acc : acc.push(cur.id);
      return acc;
    }, []);
    const ID = [...deduplID, '초기화'];
    setIdRange(ID);
  }, [datas]);

  return { datas: datas, days: days, idRange: idRange };
};
export default useChart;
