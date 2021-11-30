import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { TFormData } from '../../components/MyTable/AddDataForm/AddDataForm';
import { IUser, TItem } from '../../http/services/myTable/MyTableService';
import myTableService from '../../http/services/myTable/MyTableService';
import { store } from '../../redux/store';
import {
  getMyTableDataFailure,
  getMyTableDataSuccess,
  removeTableRow as removeTableRowAction,
  removeTableRowOnClient,
  addTableRowOnClient,
} from '../actionCreators';
import { getTableData } from '../../redux/selector';

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

export function* removeTableRow(
  action: ReturnType<typeof removeTableRowAction>
) {
  const { e, rows } = action.payload;

  // @ts-ignore
  const rowId: string = e.target?.dataset?.id;

  try {
    const newRows = rows.filter((item: any) => {
      if (!(e.target instanceof HTMLButtonElement)) {
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
      return;
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
      const item = {
        id: result.data.id,
        surname: result.data.surname,
        name: result.data.name,
        patronymic: result.data.patronymic,
        age: result.data.age,
      };
      form.resetFields();
      toCloseModal();
      const currentRows = getTableData(store.getState());
      yield put(addTableRowOnClient({ currentRows, item }));
    } else {
      throw new Error('Доставлены некорректные данные...');
    }
  } catch (e) {
    console.log('Случилась какая-то ошибка.. ');
    console.dir(e);
  }
}
