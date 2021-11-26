import { IUser } from '../../http/services/myTable/MyTableService';
import { createReducer } from '@reduxjs/toolkit';
import {
  addTableRowOnClient,
  getMyTableDataFailure,
  getMyTableDataSuccess,
  removeTableRowOnClient,
} from '../../actions/actionCreators';

type TMyTableState = {
  data: IUser[] | [];
  error: any;
};

const initialState: TMyTableState = {
  data: [],
  error: null,
};

export const myTable = createReducer(initialState, (builder) => {
  builder
    .addCase(getMyTableDataSuccess, (state, action) => {
      state.data = action.payload;
    })
    .addCase(getMyTableDataFailure, (state, action) => {
      state.error = action.payload;
    })
    .addCase(removeTableRowOnClient, (state, action) => {
      debugger;
      state.data = action.payload;
    })
    .addCase(addTableRowOnClient, (state, action) => {
      state.data = [...action.payload.currentRows, action.payload.item];
    });
});
