import { Combobox } from '@consta/uikit/Combobox';
import { Button, Props } from '@consta/uikit/Button';
import { items } from './initialData';
import { groups} from './initialData';
import { Item } from './initialData';
import { useState } from 'react';
import styles from './MyCombobox.module.css';

type TStatus = 'alert' | 'success' | 'warning' | undefined;
type TSizes = 's' | 'm' | 'l';
type TAction = 'minus' | 'plus';

const aSizes:TSizes[] = ['s', 'm', 'l'];

const MyCombobox = () => {
  const [aValue, setValue] = useState<Item[] | null>();
  const [status, setStatus] = useState<TStatus>('warning');
  const [size, setSize] = useState<TSizes>('m');

  return (
    <>
      <Combobox
        multiple
        items={items}
        value={aValue}
        size='m'
        onChange={({value}) => {
          setValue(value);
          value ? setStatus('success') : setStatus('warning');
        }}
        groups={groups}
        status={status}
        label='>> Выбор автомобиля <<'

        caption={makeText(aValue)}
        placeholder='Выберите один из автомобилей'/>
        <OwnButton label='-' onClick={() => changeSize('minus', size, setSize)}/>
        <OwnButton label='+' onClick={() => changeSize('plus', size, setSize)}/>
    </>
  )
}

const OwnButton = ({label, onClick}:Props) => {
  return (
    <>
      <Button size="xs" className={styles.btn} label={label} onClick={onClick}/>
    </>
  )
}

const makeText = (aValue:Item[]|null|undefined):string => {
  const sCaption = '(атрибут caption):';
  const sGreetings = 'Молодцы, вы выбрали следующие категории: '
  const sNoValueSelected = 'Вы ничего не выбрали';

  if (!aValue) return `${sCaption} ${sNoValueSelected}`;

  const sValues = aValue.reduce((result:Array<string>, item) => [...result, item.label], []).join(', ')

  return `${sCaption} ${sGreetings} ${sValues}`;
}

const changeSize = (sAction:TAction, currentSize:TSizes, setSize:any) => {
  console.log(currentSize);
  if (!currentSize) return setSize({size: aSizes[0]});
  const nIndexOfCurrentSize = aSizes.indexOf(currentSize);

  switch (sAction) {
    case 'plus':
      if (aSizes[nIndexOfCurrentSize + 1]) setSize({size: aSizes[nIndexOfCurrentSize + 1]});
      break;
    case 'minus':
      if (aSizes[nIndexOfCurrentSize - 1]) setSize({size: aSizes[nIndexOfCurrentSize - 1]});
      break;
    default:
      return;
  }

}

export default MyCombobox;