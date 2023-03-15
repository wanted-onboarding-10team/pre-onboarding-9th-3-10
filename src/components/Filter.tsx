import { FilterBtn } from '../styles/Button';
import { FilterDiv } from '../styles/Layout';

interface FilterProps {
  locations: string[];
  changeLocation: (value: string) => void;
}

const Filter = ({ locations, changeLocation }: FilterProps) => {
  return (
    <FilterDiv>
      {locations.map((item, index) => (
        <FilterBtn key={index} onClick={() => changeLocation(item)}>
          {item}
        </FilterBtn>
      ))}
      <FilterBtn onClick={() => changeLocation('')}>Reset</FilterBtn>
    </FilterDiv>
  );
};
export default Filter;
