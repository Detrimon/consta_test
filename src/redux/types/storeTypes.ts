import {
  TFormStep1,
  TFormStep2,
  TFormStep3,
} from '../../devComponents/RegistrationForm/types';

type TStoreRegFormData = TFormStep1 & TFormStep2 & TFormStep3;
type TStoreRegFormSuggestedData = any[] | [];

type TStoreRegForm = {
  suggestedData: TStoreRegFormSuggestedData;
  formData: TStoreRegFormData;
};
