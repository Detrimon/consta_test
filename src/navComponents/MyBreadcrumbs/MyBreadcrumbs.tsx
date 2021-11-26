import { Breadcrumbs } from '@consta/uikit/Breadcrumbs';
import { IconProps } from '@consta/uikit/Icon';
import { useLocation } from 'react-router-dom';
import history from '../../history';
import navigationMap from '../../navigationData/navigationMap';
import { TNavMap } from '../../navigationData/navigationMap';

type TIndexedNavMap = {
  [strIndex: string]: TNavMap;
};

export type TPage = {
  icon?: React.FC<IconProps>;
  link: string;
  label: string;
  isActive?: boolean;
};

interface LocationPathname {
  pathname: string;
}

const indexedNavMap: TIndexedNavMap = navigationMap.reduce(
  (result, item) => ({ ...result, [item.path]: item }),
  {}
);

const MyBreadcrumbs = () => {
  const location = useLocation<LocationPathname>();
  const pathname = location.pathname;
  const aPages = makeBreadcrumbsPages(pathname, indexedNavMap);

  if (!aPages) return <div></div>;

  return (
    <Breadcrumbs
      size="xs"
      pages={aPages}
      onlyIconRoot
      maxCount={1}
      getLabel={(item) => item.label}
      getLink={(item) => item.link}
      getIcon={(item) => item.icon}
      getIsActive={(item) => !!item.isActive}
      onClick={(item, e) => {
        e.preventDefault();
        history.push(item.link);
      }}
    />
  );
};

function makeBreadcrumbsPages(
  pathname: string,
  indexedNavMap: TIndexedNavMap
): TPage[] {
  const aPart = pathname
    .split('/')
    .filter((item) => !!item)
    .map((item) => '/' + item);

  const aPathsForSearch = aPart.reduce(
    (result, current, index) => {
      if (index === 0) return [...result, current];
      return [...result, result[index] + current];
    },
    ['/']
  );
  const aPathsForSearchLength = aPathsForSearch.length;

  const aPages: TPage[] = aPathsForSearch.map((item, index) => {
    const crumb: TNavMap = indexedNavMap[item];
    const page: TPage = {
      label: crumb?.label,
      link: crumb?.path,
      isActive: index === aPathsForSearchLength - 1 || false,
    };
    return page;
  });

  return aPages;
}

export default MyBreadcrumbs;

/** Breadcrumbs
 * Данный компонент показывает "хлебные крошки", т.е. глубину меню, по которому перешли.
 *
 * На вход подается массив объектов (pages). Каждый объект описывает одну глубину вложенности. Нулевой объект массива - корень меню.
 *
 * Каждый объект массива может иметь следующие свойства:
 *    icon       - компонент иконки, которая будет рисоваться для каждой "хлебной крошки"
 *    label      - текст "хлебной крошки"
 *    link       - ссылка, по которой должен выполняться переход при нажатии на эту "хлебную крошку"
 *    isActive   - указывает на то, что данная "хлебная крошка" в данный момент выбрана (открыта данная страница)
 *
 * Помимо pages, в Breadcrumbs можно передавать следующие свойства:
 *    getLabel - функция, которая на вход принимает объект page, а на выход должна отдать строку с названием страницы (можно
 *        выдавать 1 к 1: (page) => page.label, а можно текст label как-то преобразовать при необходимости
 *    getLink - функция, которая на вход принимает объект page, а на выход должна отдать строку со ссылкой, по которой
 *        будет переходить пользователь при нажатии на "хлебную крошку"
 *    getIcon - функция, которая на вход принимает объект icon, а на выход должна отдать функциональный компонент React для отрисовки
 *        иконки. Либо undefined
 *    onlyIconRoot (по умолчанию false) - если true, то для первого элемента (pages[0]) будет показана только иконка без текста.
 *        Если false, как по умолчанию, то будет показан и label и иконка, если есть
 *    getIsActive - функция, которая на вход принимает объект page, а на выход выдает либо true, либо false. Если true, значит
 *        данная страница (хлебная крошка) является активной в данный момент, если false, значит не активной.
 *    size - размер "хлебных крошек" :: 'xs', 's', 'm', 'l'. По умолчанию: 'm'
 *    maxCount - максимальное значение элементов в хлебных крошках. По умолчанию, 0, т.е. показывать все. Если указано, например, 2
 *        то будет показан рутовая страница и последняя, а серединка будет не показана
 *
 *    onClick - функция, вызываемая при нажатии на хлебную кнопку. Здесь должен быть описан переход по ссылке.
 *    className - строка с CSS-классом.
 */
