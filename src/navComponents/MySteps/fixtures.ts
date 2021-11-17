export type Item = {
  label: string;
  disabled?: boolean;
  skipped?: boolean;
  completed?: boolean;
};
type Items = Item[] | [];

export const items: Items = [
  {
    label: 'Шаг 1',
  },
  {
    label: 'Шаг 2',
  },
  {
    label: 'Шаг 3',
  },
  {
    label: 'Шаг 4',
  },
  {
    label: 'Шаг 5',
  },
];
