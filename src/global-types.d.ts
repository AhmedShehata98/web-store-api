interface IPaginationObject<T> {
  data: T;
  total: number;
  currentPage: number;
  limit: number;
  remainingPages: number;
  hasNext: boolean;
}
