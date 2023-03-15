import Filter from 'components/filter';
import Graph from 'components/graph';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { MockDataType } from 'types';

const HomePage = () => {
  const data = useLoaderData() as MockDataType[];
  const area = Array.from(new Set<string>(data.map(data => data.id)));

  return (
    <>
      <Filter area={area} />
      <GraphContainer>
        <Graph data={data} />
      </GraphContainer>
    </>
  );
};

const GraphContainer = styled.section`
  width: 100%;
  height: 800px;
`;
export default HomePage;
