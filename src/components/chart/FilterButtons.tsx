import React, { useEffect } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

interface IdBottonProps {
  areaCategory: string[];
  selectedCategory: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtons = ({ areaCategory, onChange, selectedCategory }: IdBottonProps) => {
  const [_, setQuery] = useSearchParams();

  useEffect(() => {
    const parameter = 'check=';
    let queryString = '';
    queryString = selectedCategory.map(v => parameter + v).join('&');
    setQuery(queryString);
  }, [selectedCategory]);

  const onSelect = (value: string) => {
    if (selectedCategory.includes(value)) {
      onChange(selectedCategory.filter(v => v !== value));
    } else {
      onChange([...selectedCategory, value]);
    }
  };

  return (
    <>
      <ButtonGroup colorScheme={'gray'}>
        {areaCategory.map(element => {
          return (
            <Button
              key={element}
              value={element}
              isActive={selectedCategory.includes(element)}
              onClick={() => onSelect(element)}
            >
              {element}
            </Button>
          );
        })}
      </ButtonGroup>
      <Button bg={'gray.100'} onClick={() => onChange([])}>
        초기화
      </Button>
    </>
  );
};

export default FilterButtons;
