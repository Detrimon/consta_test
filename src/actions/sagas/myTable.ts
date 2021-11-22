import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { TFormData } from '../../components/MyTable/AddDataForm/AddDataForm';
import { IUser, TItem } from '../../http/services/myTable/MyTableService';
import myTableService from '../../http/services/myTable/MyTableService';
import daDataService from '../../http/services/DaData/DaDataService';
import { store } from '../../redux/store';
import {
  getMyTableDataFailure,
  getMyTableDataSuccess,
  removeTableRowOnClient,
  addTableRowOnClient,
  updateAddressSuggest,
} from '../actionCreators';
import {
  GET_MYTABLE_DATA,
  REQUEST,
  REMOVE_TABLE_ROW,
  ADD_TABLE_ITEM,
  SUGGEST_DADATA_ADDRESS,
} from '../../constants/redux';
import { getTableData } from '../../redux/selector';

export function* myTableSaga() {
  yield takeLatest(GET_MYTABLE_DATA + REQUEST, getMyTableData);
  yield takeLatest(REMOVE_TABLE_ROW, removeTableRow);
  yield takeEvery(ADD_TABLE_ITEM, addTableItem);
  yield takeEvery(SUGGEST_DADATA_ADDRESS, suggestDaDataAddress);
}

export function* getMyTableData() {
  try {
    const tableData: AxiosResponse<IUser[], any> = yield call(
      myTableService.getAllUsers
    );
    yield put(getMyTableDataSuccess(tableData.data));
  } catch (e) {
    yield put(getMyTableDataFailure(e));
  }
}

export function* removeTableRow(action: any) {
  const { event, rows } = action;

  const rowId = parseInt(event.target.dataset.id, 10);

  try {
    const newRows = rows.filter((item: any) => {
      if (!(event.target instanceof HTMLButtonElement)) {
        return false;
      }
      return item.id !== rowId;
    });

    const result: AxiosResponse<IUser, any> = yield call(
      myTableService.removeItem,
      rowId
    );
    if (result.status === 200 && result.statusText === 'OK') {
      yield put(removeTableRowOnClient(newRows));
    }
    throw new Error('Доставлены некорректные данные..');
  } catch (err) {
    console.log('sagas/myTable.js Error: ');
    console.log(err);
  }
}

export function* addTableItem(action: any) {
  const { form, toCloseModal } = action;
  try {
    const { inpSurname, inpName, inpPatronymic, inpAge }: TFormData =
      yield call(form.validateFields);
    const item: TItem = {
      surname: inpSurname,
      name: inpName,
      patronymic: inpPatronymic,
      age: +inpAge,
    };
    const result: AxiosResponse<IUser, any> = yield call(
      myTableService.postItem,
      item
    );
    if (result.status === 200 && result.statusText === 'OK') {
      const resultItem = {
        id: result.data.id,
        surname: result.data.surname,
        name: result.data.name,
        patronymic: result.data.patronymic,
        age: result.data.age,
      };
      form.resetFields();
      toCloseModal();
      const currentRows = getTableData(store.getState());
      yield put(addTableRowOnClient(currentRows, resultItem));
    } else {
      throw new Error('Доставлены некорректные данные...');
    }
  } catch (e) {
    console.log('Случилась какая-то ошибка.. ');
    console.dir(e);
  }
}

export function* suggestDaDataAddress(action: any) {
  const { query } = action;

  try {
    const response: AxiosResponse<any, any> = yield call(
      daDataService.suggestAddress,
      query
    );
    if (response.status === 200) {
      const aSuggestions = response.data.suggestions;
      yield put(updateAddressSuggest(aSuggestions));
      return;
    }
    throw new Error('response.status не равен 200.. ');
  } catch (error) {
    console.log('Ууупс, какая-то ошибка.');
  }
}
