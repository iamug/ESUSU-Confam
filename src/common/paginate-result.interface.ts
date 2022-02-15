export interface IPaginateResult<T> {
  data: T;
  meta: IMeta;
}

export interface IDefaultOptions {
  limit: number;
  page: number;
}

export interface IMeta {
  totalItems: number;
  count: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface IGetMetaProps {
  total: number;
  data: any[];
  limit: number;
  page: number;
}
