
import { Grid, GridItem } from '@consta/uikit/Grid'
import { data } from './fixtures';
import './MyGrid.css';

import { useRef } from 'react'

const MyGrid = () => {
  const gridRef = useRef(null);

  return (
    <Grid cols="1" xAlign="left" gap="m" className="myGridClass" as='div' ref={gridRef}
      breakpoints={{
        's': {
          cols: "2"
        }
      }}>
      <GridItem className="myGridItemClass" col="1" breakpoints={{
        s: {
          col: "2"
        }
      }}>{data.header.title}</GridItem>
      <GridItem col="0" className="myGridItemClass hiddenLowerSmall">{
        data.menu.map((item, index) => <div key={index}>{item}</div>)
      }</GridItem>
      <GridItem className="myGridItemClass">{data.main.text}</GridItem>
      <GridItem className="myGridItemClass" col="1" breakpoints={{
        s: {
          col: "2"
        }
      }}>
        <div>{data.bottom.phone}</div>
        <div>{data.bottom.email}</div>
      </GridItem>
    </Grid>
  )
}

export default MyGrid;


/** Grid:
 *  cols - задает число колонок в гриде :: "2" или "3" (строковое значение!)
 * 
 *  gap - задает отступ между колонками и строками :: 
 *  colGap - задает отступ между колонами (перекрывает свойство gap для колонок)
 *  rowGap - задает отступ между строками (перекрывает свойство gap для строк)
 *    /// значения gap, colGap и rowGap:
 *    /// 0 | '0' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
 * 
 *  xAlign - задает выравнивание внутри всех GridItem :: 'left', 'center', 'right'
 *  yAlign - задает выравнивание внутри всех GridItem :: 'top,, 'center', 'bottom'
 * 
 *  breakpoints - возможно задавать различные значения cols, gap, colGap, rowGap, xAlign, yAlign при разной ширине экрана 
 *  от 0 до 360px задается просто параметрами cols, gap, colGap, rowGap, xAlign, yAlign без breakpoints
 *    'xs'  >=  360px
 *    's'   >=  640px
 *    'm'   >=  1024px
 *    'l'   >=  1280px
 *    'xl'  >=  1440px
 *    '2xl' >=  1920px
 */

/** GridItem:
 *  col - количество колонок, которое занимает данный GridItem :: "2" или "3" (строковое значение!)
 *  colStart - указываем, с какой колонки начинается данный элемент :: "1" по умолчанию, можно укзаать "2" или "3" (строковое значение)
 *  row - указываем количество строк, занимаемых элементом :: "3" или "4". 
 *  rowStart - указываем, с какой строки начинается данных элемент :: "1" по умолчанию, можно указать "3", например. 
 *  * ! Тут главное не переборщить с этими col, colStart и row, rowStart, так как строки и столбцы начинают передвигаться по приоритету..
 *  order - можно подвинуть элемент в начало или в конец ::
 *    order = "-1" - подвинуть в начало
 *    order = "1" - подвинуть в конец
 *    order = "0" - оставить на месте
 * 
 *  также, как и для Grid, здесь есть атрибут breakpoints с теми же характеристиками 'xs', 's', 'm', 'l', 'xl', '2xl'
 * 
 * 
 *  *! Дополнительные свойства Grid и GridItem :::
 *  *!    className   (тип String) - Указать дополнительный CSS-класс
 *  *!    as          (тип React.ElementType) - HTML-тег, в виде которого этот компонент будет представлен в DOM ('div' по умолчанию)
 *  *!    ref         (тип React.Ref<HTMLDivElement>) - Ссылка на DOM-элемент компонента
 */