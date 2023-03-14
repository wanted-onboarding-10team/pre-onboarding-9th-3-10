export interface ChartData {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface ChartDataResponse {
  [key: string]: ChartData;
}

export interface APIResponse {
  type: string;
  version: number;
  response: ChartDataResponse;
}
