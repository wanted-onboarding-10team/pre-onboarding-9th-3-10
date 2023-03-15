import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Filter = ({ area }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const area = searchParams.get('area')?.split(',');

    if (area === undefined) return setSearchParams({ area: e.target.value });

    if (area.some(area => area === e.target.value)) {
      const exceptionArea = area.filter(area => area !== e.target.value);
      if (exceptionArea.length === 0) return setSearchParams();
      return setSearchParams({ area: exceptionArea.join(',') });
    }

    setSearchParams({ area: area.join(',') + ',' + e.target.value });
  };

  const hasArea = (area: string): boolean => {
    const selectedArea = searchParams.get('area')?.split(',');

    if (selectedArea?.some(element => element === area)) return true;

    return false;
  };

  return (
    <div>
      <button onClick={() => setSearchParams()}>리셋</button>
      {area.map((area: string) => (
        <Fragment key={area}>
          <input
            type='checkbox'
            name='area'
            id={area}
            value={area}
            onChange={handleClick}
            checked={hasArea(area)}
          />
          <label htmlFor={area}>{area}</label>
        </Fragment>
      ))}
    </div>
  );
};
export default Filter;
