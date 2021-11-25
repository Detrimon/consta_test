import { TableRow } from '@consta/uikit/Table';

import { createSelector } from 'reselect';
import { RootState } from './store';
import { TPage } from '../navComponents/MyBreadcrumbs';
import { TRegFormState } from './reducers/registrationForm';

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

export const getRegistrationFormSelector = (
  state: RootState
): TRegFormState => {
  return state.registrationForm;
};

export const getSuggestedData = createSelector(
  [getRegistrationFormSelector],
  (registrationFormData) => {
    return registrationFormData.suggestedData || [];
  }
);

export const getFormDataSelector = createSelector(
  [getRegistrationFormSelector],
  (registrationFormData) => {
    return registrationFormData.formData;
  }
);

export const getTableRows = createSelector([getTableData], (tableData) => {
  return tableData.map(
    ({ id, surname, name, patronymic, age }) =>
      ({
        id: '' + id,
        surname,
        name,
        patronymic,
        age,
      } as TBaseRow)
  );
});

export const suggestedAddress = createSelector(
  [getSuggestedData],
  (suggestedAddresses) => {
    return suggestedAddresses.map((suggestedAddress) => {
      const data = suggestedAddress.data;
      return {
        value: suggestedAddress.value || '',
        data: {
          country: data?.country, // Россия
          city_with_type: data?.city_with_type, // г Москва
          street_with_type: data?.street_with_type, // Чонгарский б-р
          house_type: data?.house_type, // д
          house: data?.house, // 26А
          block_type: data?.block_type, // к
          block: data?.block, // 3
          flat_type: data?.flat_type, // кв
          flat: data?.flat, // 64
        },
      };
    });
  }
);
