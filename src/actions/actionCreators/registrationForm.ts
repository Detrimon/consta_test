import { createAction } from '@reduxjs/toolkit';
import {
  SUGGEST_DADATA_ADDRESS,
  UPDATE_ADDRESS_SUGGEST,
  UPDATE_FORM_DATA,
} from '../../constants/redux';

import { UFormSteps } from '../../devComponents/RegistrationForm/types';
import { TSuggestion } from '../../http/services/DaData/DaDataService';

export const suggestDaDataAddress = createAction<string>(
  SUGGEST_DADATA_ADDRESS
);

export const updateAddressSuggest = createAction<TSuggestion[]>(
  UPDATE_ADDRESS_SUGGEST
);

export const saveFormData = createAction<UFormSteps>(UPDATE_FORM_DATA);
