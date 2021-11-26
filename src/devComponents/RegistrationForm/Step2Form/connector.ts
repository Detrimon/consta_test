import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getFormDataSelector, suggestedAddress } from '../../../redux/selector';
import { UFormSteps } from '../types';
import {
  suggestDaDataAddress,
  saveFormData,
} from '../../../actions/actionCreators';

const mapState = (state: RootState) => ({
  formData: getFormDataSelector(state),
  aSuggestedAddress: suggestedAddress(state),
});

const mapDispatch = {
  suggestDaDataAddress: (query: string) => suggestDaDataAddress(query),
  saveFormData: (data: UFormSteps) => saveFormData(data),
};

export const connector = connect(mapState, mapDispatch);

export type TPropsFromRedux = ConnectedProps<typeof connector>;
