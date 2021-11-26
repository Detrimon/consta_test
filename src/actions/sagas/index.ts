import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
  GET_MYTABLE_DATA,
  REMOVE_TABLE_ROW,
  ADD_TABLE_ITEM,
  SUGGEST_DADATA_ADDRESS,
  REQUEST,
} from '../../constants/redux';

import { getMyTableData, removeTableRow, addTableItem } from './myTable';
import { suggestDaDataAddress } from './registrationForm';

export function* sagas() {
  yield takeLatest(GET_MYTABLE_DATA + REQUEST, getMyTableData);
  yield takeLatest(REMOVE_TABLE_ROW, removeTableRow);
  yield takeEvery(ADD_TABLE_ITEM, addTableItem);
  yield takeEvery(SUGGEST_DADATA_ADDRESS, suggestDaDataAddress);
}
