import { UFormSteps } from '../../devComponents/RegistrationForm/types';

import {
  saveFormData,
  updateAddressSuggest,
} from '../../actions/actionCreators';

import {} from '../../constants/redux';
import { UnionToIntersection } from '@reduxjs/toolkit/dist/tsHelpers';
import { createReducer } from '@reduxjs/toolkit';
import { TSuggestion } from '../../http/services/DaData/DaDataService';

export type TRegFormFormData = UnionToIntersection<UFormSteps>;

export type TRegFormState = {
  suggestedData: TSuggestion[];
  formData: TRegFormFormData;
};

const initialData: TRegFormState = {
  suggestedData: [],
  formData: {},
};

export const registrationForm = createReducer(initialData, (builder) => {
  builder
    .addCase(updateAddressSuggest, (state, action) => {
      state.suggestedData = [...action.payload];
    })
    .addCase(saveFormData, (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    });
});
