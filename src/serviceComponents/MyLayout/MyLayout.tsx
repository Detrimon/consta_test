
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from '@consta/uikit/Text';
import { useRef } from 'react';

export const MyLayout = () => {
  const scrollContainerRef = useRef(null);
  const fixedRef = useRef(null);

  return (
    <Layout direction="column" ref={scrollContainerRef}>
      <Layout>
        <Text>Заголовок</Text>
      </Layout>
      <Layout direction="column">
        <Layout ref={fixedRef} fixed verticalAlign="top">
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout>
          <Text>Контент</Text>
        </Layout>
        <Layout
          verticalAlign="bottom"
          anchorRef={fixedRef}
        >
          <Text>Фиксированный элемент</Text>
        </Layout>
        <Layout>
          <Text>Контент</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

/** Layout
 * С помощью Layout строится КАРКАС страницы.
 * Блоки лэйаута можно вкладывать один в другой, чтобы устанавливать правила, по которым они располагаются
 * на странице и по отношению друг к другу.
 * 
 * Layout - это FlexBox
 *  flex - указывает на долю, которую занимает блок в родительском элементе :: {1} или {2} 
 *  direction - указывает на расположение блока :: "row" или "column"
 */