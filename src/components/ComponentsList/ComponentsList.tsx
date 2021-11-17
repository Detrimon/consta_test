import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import oNavMap from '../../navigationData/navigationMap';
import { TNavMap } from '../../navigationData/navigationMap';
import styles from './ComponentsList.module.css';

type TCategory = {
  order: number;
  data: TNavMap[] | [];
};

type TCategories = {
  [categoryName: string]: TCategory;
};

type TComponentsListProps = {
  oCategories: TCategories;
};

const ComponentsList = ({ oCategories }: TComponentsListProps) => {
  const oResultCategories = useMemo(() => {
    return oNavMap.reduce((result: TCategories, item: TNavMap) => {
      if (oCategories[item.category]) {
        return {
          ...result,
          [item.category]: {
            ...result[item.category],
            data: [...result[item.category].data, item],
          },
        };
      }
      return result;
    }, oCategories);
  }, [oCategories]);

  const aOrderCategories = useMemo(() => {
    // aOrderCategories = ['component', 'service', ...]
    return Object.keys(oCategories) // ['key1', 'key2']
      .reduce(
        (result: Array<{ order: number; item: string }>, key: string) => [
          ...result,
          { ...oCategories[key], item: key },
        ],
        []
      ) // [ {order, data, item} ]
      .sort((itemA, itemB) => itemA.order - itemB.order)
      .map((item) => item.item);
  }, [oCategories]);

  const renderData = aOrderCategories.map((sCategory, index) => {
    const header = <h4 className={styles.categoryHeader}>{sCategory}</h4>;
    const itemList = oResultCategories[sCategory].data?.map((item, index) => {
      return (
        <li key={index} className={styles.list_item}>
          <Link className={styles.link_item} to={item.path}>
            {item.label}
          </Link>
        </li>
      );
    });
    return (
      <React.Fragment key={index}>
        {header}
        <ul>{itemList}</ul>
      </React.Fragment>
    );
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>List of components</h3>
      {renderData}
    </div>
  );
};

export default ComponentsList;
