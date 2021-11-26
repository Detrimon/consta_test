import { connect, ConnectedProps } from 'react-redux';
import { UFormSteps } from '../types';
import { saveFormData } from '../../../actions/actionCreators';

const mapDispatch = {
  saveFormData: (data: UFormSteps) => saveFormData(data),
};

export const connector = connect(null, mapDispatch);

export type TPropsFromRedux = ConnectedProps<typeof connector>;
