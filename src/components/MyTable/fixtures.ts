const columns = [
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

const filters = [
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

export const tableData = {
  columns,
  filters,
};
