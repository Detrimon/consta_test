import { ConnectedProps, connect } from 'react-redux';

import { RootState } from '../../../redux/store';
import { getFormDataSelector } from '../../../redux/selector';

const mapState = (state: RootState) => ({
  formData: getFormDataSelector(state),
});

export const connector = connect(mapState);

export type TPropsFromRedux = ConnectedProps<typeof connector>;
