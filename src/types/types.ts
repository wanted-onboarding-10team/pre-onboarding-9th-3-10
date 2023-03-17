export interface ChartData {
  date: string;
  time: string;
  id: string;
  value_area: number;
  value_bar: number;
}
export interface ChartDataByDay {
  [key: string]: ChartData[];
}

export interface ChartDataResponse {
  [date: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
