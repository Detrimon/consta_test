// import { createSelector } from 'reselect';
import { RootState } from './store';
import { TPage } from '../navComponents/MyBreadcrumbs';

export const breadcrumbsSelector = (state: RootState): TPage[] => {
  return state.breadcrumbs.pages;
};

export const getTableData = (state: RootState) => state?.myTable?.data;
