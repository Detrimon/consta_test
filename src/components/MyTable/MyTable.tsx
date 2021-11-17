import { Table, TableColumn } from '@consta/uikit/Table';
import AddDataForm from './AddDataForm';
import { tableData } from './fixtures';
import { Button } from '@consta/uikit/Button';
import { useState, useEffect } from 'react';
// @ts-ignore
import { useKeycloak } from '@react-keycloak/web';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  getMyTableDataRequest,
  removeTableRow,
} from '../../actions/actionCreators';

import { TBaseRow } from './fixtures';
import { Modal } from '@consta/uikit/Modal';

interface TRow extends TBaseRow {
  actions: string;
}

// @ts-ignore
const MyTable = ({ rows, getTableData, removeItem }) => {
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  if (!tableData || !rows) return null;

  const columns = tableData.columns;
  const filters = tableData.filters;

  const actionColumn = {
    title: 'Действия',
    accessor: 'actions',
    renderCell: (row: typeof rows[number]) => {
      return (
        <>
          <Button
            data-id={row.id}
            label="Удалить"
            onClick={(e: React.SyntheticEvent<EventTarget, Event>) =>
              removeItem(rows, e)
            }
          />
        </>
      );
    },
    mergeCell: true,
  } as TableColumn<TRow>;
  return keycloak && initialized && keycloak.authenticated ? (
    <>
      <Button size="s" label={'+'} onClick={() => setIsModalOpen(true)} />
      <Table
        columns={[...columns, actionColumn]}
        rows={rows}
        filters={filters}
      />
      <Modal
        isOpen={isModalOpen}
        onEsc={() => setIsModalOpen(false)}
        onClickOutside={() => setIsModalOpen(false)}
      >
        <AddDataForm toCloseModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  ) : null;
};
const mapStateToProps = (state: RootState) => ({
  rows: state?.myTable?.data,
});

const mapDispatchToProps = {
  getTableData: () => getMyTableDataRequest(),
  removeItem: (rows: TBaseRow[], e: React.SyntheticEvent<EventTarget, Event>) =>
    removeTableRow(rows, e),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTable);
