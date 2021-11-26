import { UFormSteps } from '../../devComponents/RegistrationForm/types/';
import {
  REMOVE_TABLE_ROW,
  REMOVE_TABLE_ROW_ON_CLIENT,
  ADD_TABLE_ROW_ON_CLIENT,
  SUGGEST_DADATA_ADDRESS,
  UPDATE_ADDRESS_SUGGEST,
  UPDATE_FORM_DATA,
} from '../../constants/redux';

export type ActionsType =
  | ActionType_AddTableRowOnClient
  | ActionType_RemoveTableRow
  | ActionType_RemoveTableRowOnClient
  | ActionType_SaveFormData
  | ActionType_SuggestDaDataAddress
  | ActionType_UpdateAddressSuggest;

export type ActionType_SaveFormData = {
  type: typeof UPDATE_FORM_DATA;
  formData: UFormSteps;
};

export type ActionType_UpdateAddressSuggest = {
  type: typeof UPDATE_ADDRESS_SUGGEST;
  payload: any;
};

export type ActionType_SuggestDaDataAddress = {
  type: typeof SUGGEST_DADATA_ADDRESS;
  query: string;
};

export type ActionType_AddTableRowOnClient = {
  type: typeof ADD_TABLE_ROW_ON_CLIENT;
  rows: any;
  item: any;
};

export type ActionType_RemoveTableRowOnClient = {
  type: typeof REMOVE_TABLE_ROW_ON_CLIENT;
  rows: any;
};

export type ActionType_RemoveTableRow = {
  type: typeof REMOVE_TABLE_ROW;
  rows: any;
  event: any;
};
