import {
  Table,
  TableColumn,
  TableControl,
  TableFilters,
} from '@consta/uikit/Table';
import AddDataForm from './AddDataForm';
import { tableData } from './fixtures';
import { Button } from '@consta/uikit/Button';
import { useState, useEffect, useMemo } from 'react';
// @ts-ignore
import { useKeycloak } from '@react-keycloak/web';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  getMyTableDataRequest,
  removeTableRow,
} from '../../actions/actionCreators';

import { TBaseRow } from '../../redux/selector';
import { Modal } from '@consta/uikit/Modal';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';

import styles from './MyTable.module.css';
import Loader from '../Loader';
import { getTableRows } from '../../redux/selector';

export interface TRow extends TBaseRow {
  actions?: string;
}

type TMyTable = {
  rows: TRow[];
  getTableData: any;
  removeItem: any;
};

const filters = tableData.filters as TableFilters<TRow>;

const MyTable = ({ rows, getTableData, removeItem }: TMyTable) => {
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideColumns, setHideColumns] = useState<{ [key: string]: boolean }>({
    name: false,
    patronymic: false,
  });

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const columns = useMemo(() => {
    return tableData.columns.map((column) => {
      if (!column.accessor) return { ...column };
      let testColumn = column;
      return hideColumns.hasOwnProperty(column.accessor)
        ? {
            ...column,
            control: ({ column }: TableControl<TBaseRow>) => {
              return (
                <Button
                  size="xs"
                  iconSize="s"
                  view="clear"
                  onlyIcon
                  iconLeft={IconArrowLeft}
                  onClick={() =>
                    setHideColumns({
                      ...hideColumns,
                      [testColumn.accessor]: !hideColumns[testColumn.accessor],
                    })
                  }
                />
              );
            },
            hidden: hideColumns[testColumn.accessor],
          }
        : { ...column };
    });
  }, [hideColumns]) as TableColumn<TRow>[];

  if (!tableData || !rows) return <Loader />;

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
      <span className={styles.separator}></span>
      <Button
        label="Показать все столбцы"
        size="s"
        onClick={() => {
          const updatedHideColumns = Object.keys(hideColumns).reduce(
            (result, item) => ({ ...result, [item]: false }),
            {}
          );
          setHideColumns(updatedHideColumns);
        }}
      />
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
  ) : (
    <Loader />
  );
};
const mapStateToProps = (state: RootState) => ({
  rows: getTableRows(state),
});

const mapDispatchToProps = {
  getTableData: () => getMyTableDataRequest(),
  removeItem: (rows: TBaseRow[], e: React.SyntheticEvent<EventTarget, Event>) =>
    removeTableRow(rows, e),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTable);
