export interface IPaginate {
  pageNumber: number;
  sort?: any;
  search?: {
    [key: string]: string;
  }[];
}
