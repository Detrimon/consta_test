import { UPDATE_ADDRESS_SUGGEST } from '../../constants/redux';

const initialData = {
  suggestedData: [],
};

export const registrationForm = (state = initialData, action: any) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_ADDRESS_SUGGEST:
      console.log(data);
      return { ...state, suggestedData: data };
    default:
      return state;
  }
};
