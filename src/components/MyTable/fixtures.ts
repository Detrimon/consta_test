import {
  TableColumn,
  TableRow,
  TableProps,
  TableFilters,
} from '@consta/uikit/Table';

const columns: TableColumn<typeof rows[number]>[] = [
  {
    title: 'Фамилия',
    accessor: 'surname',
    align: 'left',
    sortable: true,
    order: 'ASC',
  },
  {
    title: 'Имя',
    accessor: 'name',
    align: 'left',
    sortable: false,
  },
  {
    title: 'Отчество',
    accessor: 'patronymic',
    align: 'left',
    sortable: false,
  },
  {
    title: 'Возраст',
    accessor: 'age',
    align: 'right',
    sortable: false,
  },
];

export type TBaseRow = TableRow & {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  age: number;
};

const rows = [
  {
    id: '1',
    surname: 'Иванов',
    name: 'Иван',
    actions: 'delete',
    patronymic: 'Иванович',
    age: 44,
  },
  {
    id: '2',
    surname: 'Иванов',
    name: 'Иван',
    actions: 'delete',
    patronymic: 'Иванович',
    age: 43,
  },
  {
    id: '3',
    surname: 'Иванов',
    name: 'Иван',
    actions: 'delete',
    patronymic: 'Иванович',
    age: 55,
  },
  {
    id: '4',
    surname: 'Иванов',
    name: 'Иван',
    actions: 'delete',
    patronymic: 'Иванович',
    age: 20,
  },
];

const filters: TableFilters<typeof rows[number]> = [
  {
    id: 'noneFilter',
    name: 'Сбросить фильтр',
    field: 'surname',
    filterer: () => true,
  },
  {
    id: 'myOwnFilter',
    name: 'Туровский',
    field: 'surname',
    filterer: (value: string) => value === 'Туровский',
  },
];

export const tableData: TableProps<typeof rows[number]> = {
  columns,
  rows,
  filters,
};
