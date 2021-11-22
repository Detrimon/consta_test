import {
  GET_MYTABLE_DATA,
  REQUEST,
  SUCCESS,
  FAILURE,
  REMOVE_TABLE_ROW,
  REMOVE_TABLE_ROW_ON_CLIENT,
  ADD_TABLE_ROW_ON_CLIENT,
  SUGGEST_DADATA_ADDRESS,
  UPDATE_ADDRESS_SUGGEST,
  UPDATE_FORM_DATA,
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

export const suggestDaDataAddress = (query: string) => ({
  type: SUGGEST_DADATA_ADDRESS,
  query: query,
});

export const updateAddressSuggest = (data: any) => ({
  type: UPDATE_ADDRESS_SUGGEST,
  data: data,
});

export const saveFormData = (data: any) => ({
  type: UPDATE_FORM_DATA,
  formData: data,
});
