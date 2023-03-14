export interface MockDataType {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

export interface ChartDataType {
  time: string;
  id: string;
  value_area: number;
  value_bar: number;
}
