import styled from 'styled-components';

export const CategoryBtn = styled.button`
  width: 80px;
  height: 30px;
  margin-right: 10px;
  border: solid rgba(0, 0, 0, 0.1) 1px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;

export const FilterBtn = styled.button`
  width: 100px;
  padding: 0 20px;
  height: 30px;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: 'rgba(0, 0, 0, 0.1)';
  color: #696969;
  cursor: pointer;
  border-radius: 20px;

  &.active {
    background-color: #505bf0;
    color: #fff;
  }
`;
