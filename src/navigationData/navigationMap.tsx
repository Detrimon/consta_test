import Home from '../components/Home';
import ComponentsList from '../components/ComponentsList';
import { oCategories } from '../components/ComponentsList/initialData';
import MyGrid from '../serviceComponents/MyGrid';
import MyHeader from '../serviceComponents/MyHeader';
import MyTable from '../components/MyTable';
import MyButton from '../components/MyButton';
import MyCombobox from '../components/MyCombobox';
import MySkeleton from '../components/MySkeleton';
import MyFileField from '../components/MyFileField';
import MyAttachment from '../components/MyAttachment';
import MySteps from '../navComponents/MySteps';
import MyDialog from '../components/MyDialog';
import MyModal from '../components/MyModal';
import RegistrationForm from '../devComponents/RegistrationForm';

import { IconLaptop } from '@consta/uikit/IconLaptop';
import { IconBento } from '@consta/uikit/IconBento';
import { IconProps } from '@consta/uikit/Icon';

export type TNavMap = {
  isExact?: boolean;
  icon?: IconProps;
  label: string;
  category: string;
  path: string;
  component: () => JSX.Element;
  attributes?: typeof oCategories;
};

const oNavMap = [
  {
    icon: IconLaptop,
    category: 'root',
    path: '/',
    label: 'Home',
    component: Home,
    isExact: true,
  },
  {
    icon: IconBento,
    category: 'menu',
    path: '/components',
    label: 'Components',
    component: ComponentsList,
    attributes: { oCategories },
    isExact: true,
  },
  {
    category: 'service',
    path: '/components/Grid',
    label: 'Grid',
    component: MyGrid,
  },
  {
    category: 'service',
    path: '/components/Header',
    label: 'Header',
    component: MyHeader,
  },
  {
    category: 'component',
    path: '/components/MyTable',
    label: 'Table',
    component: MyTable,
  },
  {
    category: 'component',
    path: '/components/MyButton',
    label: 'Button',
    component: MyButton,
  },
  {
    category: 'component',
    path: '/components/MySkeleton',
    label: 'Skeleton',
    component: MySkeleton,
  },
  {
    category: 'component',
    path: '/components/MyCombobox',
    label: 'Combobox',
    component: MyCombobox,
  },
  {
    category: 'component',
    path: '/components/MyFileField',
    label: 'FileField',
    component: MyFileField,
    attributes: { multiple: true, accept: ['.png', '.jpg', '.bmp'].join(',') },
  },
  {
    category: 'component',
    path: '/components/MyAttachment',
    label: 'Attachment',
    component: MyAttachment,
  },
  {
    category: 'navComponent',
    path: '/components/MySteps',
    label: 'Steps',
    component: MySteps,
  },
  {
    category: 'component',
    path: '/components/MyDialog',
    label: 'Dialog',
    component: MyDialog,
  },
  {
    category: 'component',
    path: '/components/MyModal',
    label: 'Modal',
    component: MyModal,
  },
  {
    category: 'component',
    path: '/components/RegistrationForm',
    label: 'RegistrationForm',
    component: RegistrationForm,
  },
] as TNavMap[];

export default oNavMap;
