export type Item = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type TGroup = {
  label: string;
  id: string | number;
};

export const items:Item[] = [
  {
    label: 'Kia Ceed 2010',
    id: 1,
    groupId: 1
  }, {
    label: 'Kia Ceed 2015',
    id: 2,
    disabled: true,
    groupId: 1
  }, {
    label: 'Citroen C4 2011',
    id: 3,
    groupId: 2
  }, {
    label: 'Skoda Kodiaq 2021',
    id: 4,
    disabled: true,
    groupId: 3
  }, {
    label: 'Lada Kalina 1998',
    id: 5,
    groupId: 4
  }, {
    label: 'Great Wall 2000',
    id: 6
  }
];

export const groups:TGroup[] = [
  {
    label: 'KIA',
    id: 1
  }, {
    label: 'Citroen',
    id: 2
  }, {
    label: 'Skoda',
    id: 3
  }, {
    label: 'LADA',
    id: 4
  },
]