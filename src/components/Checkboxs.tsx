import React from 'react';
import { Checkbox } from '@chakra-ui/react';

interface CheckboxProps {
  element: string;
  checkHandler: (e: React.ChangeEvent) => void;
}

const IdCheckboxs = ({ checkHandler, element }: CheckboxProps) => {
  return (
    <Checkbox value={element} onChange={e => checkHandler(e)}>
      {element}
    </Checkbox>
  );
};

export default IdCheckboxs;
