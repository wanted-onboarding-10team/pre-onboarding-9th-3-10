import { Flex, Text } from '@chakra-ui/react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styled from '@emotion/styled';

interface ColorObj {
  [key: string]: string;
}

const Content = styled.div`
  padding: 10px;
  min-width: 170px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #bababa;
  border: solid 1px #bababa;
`;

const CustomTooltip = ({ active, payload: load }: TooltipProps<ValueType, NameType>) => {
  if (active && load && load.length) {
    const { payload } = load[0];

    const nameColorObj = load.reduce<ColorObj>((acc, cur) => {
      const { name = '', color } = cur;
      return Object.assign(acc, { [name]: color });
    }, {});

    const key = Object.keys(payload);

    return (
      <Content>
        <Flex direction={'column'}>
          {key.map(e => {
            return (
              <Text key={e + 'Tooltip Key'} className='label' color={nameColorObj[e]}>
                <b>{e} :</b> {payload[e]}
              </Text>
            );
          })}
        </Flex>
      </Content>
    );
  }
};

export default CustomTooltip;
