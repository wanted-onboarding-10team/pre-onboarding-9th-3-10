export interface ChartResponse {
  [key: string]: Chart;
}

export interface Chart {
  day: string;
  id: string;
  value_area: number;
  value_bar: number;
  value_day: string;
}
