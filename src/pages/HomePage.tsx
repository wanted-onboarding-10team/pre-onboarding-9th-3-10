import Graph from 'components/graph';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { MockDataType } from 'types';

const HomePage = () => {
  const data = useLoaderData() as MockDataType[];

  return (
    <GraphContainer>
      <Graph data={data} />
    </GraphContainer>
  );
};

const GraphContainer = styled.section`
  width: 100%;
  height: 800px;
`;
export default HomePage;
