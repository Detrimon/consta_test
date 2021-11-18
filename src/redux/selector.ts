import { TableRow } from '@consta/uikit/Table';

import { createSelector } from 'reselect';
import { RootState } from './store';
import { TPage } from '../navComponents/MyBreadcrumbs';

export type TBaseRow = TableRow & {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  age: number;
};

export const breadcrumbsSelector = (state: RootState): TPage[] => {
  return state.breadcrumbs.pages;
};

export const getTableData = (state: RootState) => {
  return state?.myTable?.data || [];
};

export const getTableRows = createSelector([getTableData], (tableData) => {
  return tableData.map(({ id, surname, name, patronymic, age }) => ({
    id: '' + id,
    surname,
    name,
    patronymic,
    age,
  }));
});
