import { ChartDataArray } from 'App';
import ChartArea from 'components/ChartArea';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getChartData } from 'utils/api';

const FilteredContainer = styled.div`
  height: 5vh;
  padding-left: 5vw;
  padding-top: 5vh;
`;

const IdTitle = styled.h2`
  font-size: 1.5em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  background: white;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    background: palevioletred;
    color: white;
  }
`;

let init = false;

const ChartPage = () => {
  const [data, setData] = useState<ChartDataArray[]>();
  const [clickedId, setClickId] = useState<string | null>(null);
  const categoryById = data
    ? Array.from(data.reduce((arr, currData) => arr.add(currData.id), new Set<string>()))
    : [];

  useEffect(() => {
    if (!init) {
      (async () => {
        const apiData = await getChartData();
        const convertData: ChartDataArray[] = Object.entries(apiData).map(item => {
          return { time: item[0], ...item[1] };
        });
        init = true;
        setData(convertData);
      })();
    }
  }, []);

  const changeClickedId = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { value },
    } = event;
    changeClickedIdByValue(value);
  };

  const changeClickedIdByValue = (value: string) => {
    setClickId(prev => (prev === value ? null : value));
  };

  if (data) {
    return (
      <>
        <FilteredContainer>
          <IdTitle>{clickedId}</IdTitle>
        </FilteredContainer>
        <ChartArea
          chartData={data}
          clickedId={clickedId}
          changeClickedIdByValue={changeClickedIdByValue}
        />
        <ButtonContainer>
          {categoryById?.map(id => (
            <Button key={id} value={id} onClick={changeClickedId}>
              {id}
            </Button>
          ))}
        </ButtonContainer>
      </>
    );
  }
  return null;
};

export default ChartPage;
