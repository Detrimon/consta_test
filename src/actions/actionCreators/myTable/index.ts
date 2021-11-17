import {
  GET_MYTABLE_DATA,
  REQUEST,
  SUCCESS,
  FAILURE,
  REMOVE_TABLE_ROW,
  REMOVE_TABLE_ROW_ON_CLIENT,
  ADD_TABLE_ROW_ON_CLIENT,
} from '../../../constants/redux';

import { IUser } from '../../../http/services/myTable/MyTableService';

export const getMyTableDataRequest = () => ({
  type: GET_MYTABLE_DATA + REQUEST,
});

export const getMyTableDataSuccess = (data: IUser[]) => ({
  type: GET_MYTABLE_DATA + SUCCESS,
  data: data,
});

export const getMyTableDataFailure = (error: any) => ({
  type: GET_MYTABLE_DATA + FAILURE,
  error: error,
});

export const removeTableRow = (rows: any, e: any) => ({
  type: REMOVE_TABLE_ROW,
  rows: rows,
  event: e,
});

export const removeTableRowOnClient = (rows: any) => ({
  type: REMOVE_TABLE_ROW_ON_CLIENT,
  rows: rows,
});

export const addTableRowOnClient = (currentRows: any, item: any) => ({
  type: ADD_TABLE_ROW_ON_CLIENT,
  rows: currentRows,
  item: item,
});
