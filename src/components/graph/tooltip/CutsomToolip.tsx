import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styled from 'styled-components';

const CustomToolip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const { id, value_area, value_bar } = payload[0].payload;
    return (
      <TooltipContainer>
        <p>{`id : ${id}`}</p>
        <p>{`value_area : ${value_area}`}</p>
        <p>{`value_bar : ${value_bar}`}</p>
      </TooltipContainer>
    );
  }
  return null;
};

const TooltipContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 5px;
`;
export default CustomToolip;
