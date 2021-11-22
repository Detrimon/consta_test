import {
  UPDATE_ADDRESS_SUGGEST,
  UPDATE_FORM_DATA,
} from '../../constants/redux';

const initialData = {
  suggestedData: [],
  formData: {
    // Form 1 data - User Data
    inpSurname: '',
    inpName: '',
    inpPatronymic: '',
    pickBirthday: null,
    chooseGender: undefined,
    inpPassSeries: '',
    inpPassNumber: '',
    // Form 2 data - Delivery
  },
};

export const registrationForm = (state = initialData, action: any) => {
  const { type, data, formData } = action;

  switch (type) {
    case UPDATE_ADDRESS_SUGGEST:
      return { ...state, suggestedData: data };
    case UPDATE_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...formData },
      };

    default:
      return state;
  }
};
