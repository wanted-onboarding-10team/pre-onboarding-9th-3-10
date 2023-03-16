export interface Data {
  date: string;
  id: string;
  value_area: number;
  value_bar: number;
}

export interface MockData {
  [date: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
