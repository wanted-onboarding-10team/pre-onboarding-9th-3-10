import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
interface IdBottonProps {
  idRange: string[];
  idSelect: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtons = ({ idRange, onChange, idSelect }: IdBottonProps) => {
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    let str = 'check=';
    idSelect.forEach(e => (str = str.concat(e, '_')));
    setQuery(str);
  }, [idSelect]);

  const onSelect = (value: string) => {
    if (idSelect.includes(value)) {
      onChange(idSelect.filter(v => v !== value));
    } else {
      onChange([...idSelect, value]);
    }

    if (value === '초기화') {
      onChange([]);
    }
  };

  return (
    <>
      <ButtonGroup colorScheme={'gray'}>
        {idRange.map(element => {
          return (
            <Button
              key={element}
              value={element}
              isActive={idSelect.includes(element)}
              onClick={() => onSelect(element)}
            >
              {element}
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};

export default FilterButtons;
