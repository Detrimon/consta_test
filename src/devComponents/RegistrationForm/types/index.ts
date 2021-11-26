import { FormInstance } from 'antd';
import { GENDER } from '../constants';

export type TCStepsOwnProps = {
  aSteps?: TStep[];
};

export type TStep = {
  label: string;
  disabled?: boolean;
  completed?: boolean;
};

export type TStep1Form = {
  form: FormInstance<TFormStep1>;
};

export type TStep2Form = {
  form: FormInstance<TFormStep2>;
};

export type TStep3Form = {
  form: FormInstance<TFormStep3>;
};

export type UFormSteps = TFormStep1 | TFormStep2 | TFormStep3;

export type TFormStep1 = {
  chooseGender?: GENDER;
  inpName?: string;
  inpPassNumber?: string;
  inpPassSeries?: string;
  inpPatronymic?: string;
  inpSurname?: string;
  pickBirthday?: Date | null;
};

export type TFormStep2 = {
  inpHouseNumber?: string;
  inpStreetSuggest?: string;
  inpStreetItem?: string;
  inpBuzzer?: string;
  inpTextArea?: string;
};

export type TFormStep3 = {
  inpCreditCard?: string;
  inpCode?: string;
};
