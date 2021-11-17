import produce from 'immer';
import { IUser } from '../../http/services/myTable/MyTableService';
import {
  FAILURE,
  GET_MYTABLE_DATA,
  SUCCESS,
  REMOVE_TABLE_ROW_ON_CLIENT,
  ADD_TABLE_ROW_ON_CLIENT,
} from '../../constants/redux';

type TMyTableState = {
  data: IUser[] | null;
  error: any;
};

type TMyTableAction = {
  type: string;
  data: IUser[];
  error: any;
  rows: any;
  item: IUser;
};

const initialState = {
  data: null,
  error: null,
};

// export type IItem = {
//   id:
// }

export const myTable = produce(
  (draft: TMyTableState = initialState, action: TMyTableAction) => {
    const { type, data, error, rows, item } = action;

    switch (type) {
      case GET_MYTABLE_DATA + SUCCESS:
        draft.data = data;
        break;
      case GET_MYTABLE_DATA + FAILURE:
        draft.error = error;
        break;
      case REMOVE_TABLE_ROW_ON_CLIENT:
        draft.data = rows;
        break;
      case ADD_TABLE_ROW_ON_CLIENT:
        draft.data = [...rows, item];
        break;
      default:
        return draft;
    }
  }
);
