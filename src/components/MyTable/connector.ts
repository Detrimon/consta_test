import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  getMyTableDataRequest,
  removeTableRow,
} from '../../actions/actionCreators/';
import { getTableRows, TBaseRow } from '../../redux/selector';

const mapState = (state: RootState) => ({
  rows: getTableRows(state),
});

const mapDispatch = {
  getTableData: () => getMyTableDataRequest(),
  removeItem: (rows: TBaseRow[], e: React.SyntheticEvent<EventTarget, Event>) =>
    removeTableRow({ rows, e }),
};

export const connector = connect(mapState, mapDispatch);

export type TPropsFromRedux = ConnectedProps<typeof connector>;
