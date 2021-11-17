import { IconBag } from '@consta/uikit/IconBag'

const myIconBag = () => IconBag({view: 'warning', size: 'm'});

export const myPages = [
  {
    icon: myIconBag,
    label: 'Home',
    link: '/'
  }, {
    icon: myIconBag,
    label: 'Header',
    link: '/header'
  }
];