import { FilterBtn } from 'styles/Button';
import { FilterDiv } from 'styles/Layout';

interface FilterProps {
  locations: string[];
  location: string;
  changeLocation: (value: string) => void;
}

const Filter = ({ locations, location, changeLocation }: FilterProps) => {
  return (
    <FilterDiv>
      {locations.map((item, index) => (
        <FilterBtn
          className={location === item ? 'active' : ''}
          key={index}
          onClick={() => changeLocation(item)}
        >
          {item}
        </FilterBtn>
      ))}
    </FilterDiv>
  );
};
export default Filter;
