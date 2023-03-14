import { TooltopDiv } from '../styles/Layout';
import { Title, Item } from '../styles/Text';
import { Tooltip } from '../types/Chart';

const CustomTooltip = ({ active, payload }: Tooltip) => {
  if (active && payload) {
    return (
      <TooltopDiv>
        <Title>{payload[0].payload.id}</Title>
        <Item>value_area: {payload[0].payload.value_area}</Item>
        <Item>value_bar: {payload[0].payload.value_bar}</Item>
        <Item>day: {payload[0].payload.value_day}</Item>
      </TooltopDiv>
    );
  }

  return null;
};

export default CustomTooltip;
