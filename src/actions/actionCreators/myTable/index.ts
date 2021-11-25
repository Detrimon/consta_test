import { createAction } from '@reduxjs/toolkit';

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

import {
  ActionType_AddTableRowOnClient,
  ActionType_RemoveTableRow,
  ActionType_RemoveTableRowOnClient,
} from '../../types';

import { IUser } from '../../../http/services/myTable/MyTableService';
import { UFormSteps } from '../../../devComponents/RegistrationForm/types/';
import { TSuggestion } from '../../../http/services/DaData/DaDataService';

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

export const removeTableRow = (
  rows: any,
  e: any
): ActionType_RemoveTableRow => ({
  type: REMOVE_TABLE_ROW,
  rows: rows,
  event: e,
});

export const removeTableRowOnClient = (
  rows: any
): ActionType_RemoveTableRowOnClient => ({
  type: REMOVE_TABLE_ROW_ON_CLIENT,
  rows: rows,
});

export const addTableRowOnClient = (
  currentRows: any,
  item: any
): ActionType_AddTableRowOnClient => ({
  type: ADD_TABLE_ROW_ON_CLIENT,
  rows: currentRows,
  item: item,
});

export const suggestDaDataAddress = createAction<string>(
  SUGGEST_DADATA_ADDRESS
);

export const updateAddressSuggest = createAction<TSuggestion[]>(
  UPDATE_ADDRESS_SUGGEST
);

export const saveFormData = createAction<UFormSteps>(UPDATE_FORM_DATA);
