import { createAction } from '@reduxjs/toolkit';

import {
  GET_MYTABLE_DATA,
  REQUEST,
  SUCCESS,
  FAILURE,
  REMOVE_TABLE_ROW,
  REMOVE_TABLE_ROW_ON_CLIENT,
  ADD_TABLE_ROW_ON_CLIENT,
} from '../../constants/redux';

import { IUser } from '../../http/services/myTable/MyTableService';
import { TBaseRow } from '../../redux/selector';

export const getMyTableDataRequest = createAction(GET_MYTABLE_DATA + REQUEST);

export const getMyTableDataSuccess = createAction<IUser[]>(
  GET_MYTABLE_DATA + SUCCESS
);

export const getMyTableDataFailure = createAction<any>(
  GET_MYTABLE_DATA + FAILURE
);

export const removeTableRow = createAction<{
  rows: TBaseRow[];
  e: React.SyntheticEvent<EventTarget, Event>;
}>(REMOVE_TABLE_ROW);

export const removeTableRowOnClient = createAction<any>(
  REMOVE_TABLE_ROW_ON_CLIENT
);

export const addTableRowOnClient = createAction<{
  currentRows: any;
  item: any;
}>(ADD_TABLE_ROW_ON_CLIENT);
