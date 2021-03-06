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
 * ???????????? ?????????????????? ???????????????????? "?????????????? ????????????", ??.??. ?????????????? ????????, ???? ???????????????? ??????????????.
 *
 * ???? ???????? ???????????????? ???????????? ???????????????? (pages). ???????????? ???????????? ?????????????????? ???????? ?????????????? ??????????????????????. ?????????????? ???????????? ?????????????? - ???????????? ????????.
 *
 * ???????????? ???????????? ?????????????? ?????????? ?????????? ?????????????????? ????????????????:
 *    icon       - ?????????????????? ????????????, ?????????????? ?????????? ???????????????????? ?????? ???????????? "?????????????? ????????????"
 *    label      - ?????????? "?????????????? ????????????"
 *    link       - ????????????, ???? ?????????????? ???????????? ?????????????????????? ?????????????? ?????? ?????????????? ???? ?????? "?????????????? ????????????"
 *    isActive   - ?????????????????? ???? ????, ?????? ???????????? "?????????????? ????????????" ?? ???????????? ???????????? ?????????????? (?????????????? ???????????? ????????????????)
 *
 * ???????????? pages, ?? Breadcrumbs ?????????? ???????????????????? ?????????????????? ????????????????:
 *    getLabel - ??????????????, ?????????????? ???? ???????? ?????????????????? ???????????? page, ?? ???? ?????????? ???????????? ???????????? ???????????? ?? ?????????????????? ???????????????? (??????????
 *        ???????????????? 1 ?? 1: (page) => page.label, ?? ?????????? ?????????? label ??????-???? ?????????????????????????? ?????? ??????????????????????????
 *    getLink - ??????????????, ?????????????? ???? ???????? ?????????????????? ???????????? page, ?? ???? ?????????? ???????????? ???????????? ???????????? ???? ??????????????, ???? ??????????????
 *        ?????????? ???????????????????? ???????????????????????? ?????? ?????????????? ???? "?????????????? ????????????"
 *    getIcon - ??????????????, ?????????????? ???? ???????? ?????????????????? ???????????? icon, ?? ???? ?????????? ???????????? ???????????? ???????????????????????????? ?????????????????? React ?????? ??????????????????
 *        ????????????. ???????? undefined
 *    onlyIconRoot (???? ?????????????????? false) - ???????? true, ???? ?????? ?????????????? ???????????????? (pages[0]) ?????????? ???????????????? ???????????? ???????????? ?????? ????????????.
 *        ???????? false, ?????? ???? ??????????????????, ???? ?????????? ?????????????? ?? label ?? ????????????, ???????? ????????
 *    getIsActive - ??????????????, ?????????????? ???? ???????? ?????????????????? ???????????? page, ?? ???? ?????????? ???????????? ???????? true, ???????? false. ???????? true, ????????????
 *        ???????????? ???????????????? (?????????????? ????????????) ???????????????? ???????????????? ?? ???????????? ????????????, ???????? false, ???????????? ???? ????????????????.
 *    size - ???????????? "?????????????? ????????????" :: 'xs', 's', 'm', 'l'. ???? ??????????????????: 'm'
 *    maxCount - ???????????????????????? ???????????????? ?????????????????? ?? ?????????????? ??????????????. ???? ??????????????????, 0, ??.??. ???????????????????? ??????. ???????? ??????????????, ????????????????, 2
 *        ???? ?????????? ?????????????? ?????????????? ???????????????? ?? ??????????????????, ?? ?????????????????? ?????????? ???? ????????????????
 *
 *    onClick - ??????????????, ???????????????????? ?????? ?????????????? ???? ?????????????? ????????????. ?????????? ???????????? ???????? ???????????? ?????????????? ???? ????????????.
 *    className - ???????????? ?? CSS-??????????????.
 */
