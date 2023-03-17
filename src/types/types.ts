export interface Data {
  days: string;
  id: string;
  value_area: number;
  value_bar: number;
}

export interface OriginData {
  [date: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
