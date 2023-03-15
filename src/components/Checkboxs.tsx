import React from 'react';
import { Checkbox } from '@chakra-ui/react';

const IdCheckboxs = ({ element }: { element: string }) => {
  return <Checkbox value={element}>{element}</Checkbox>;
};

export default IdCheckboxs;
