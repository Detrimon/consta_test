import { Header, HeaderModule, HeaderLogo, HeaderMenu, HeaderSearchBar, HeaderLogin, HeaderButton } from '@consta/uikit/Header';
import { Text } from '@consta/uikit/Text';
import { aMenu as aMenuData } from './fixtures';
import { IconCancel } from '@consta/uikit/IconCancel';

const myIconCancel = () => IconCancel({view: 'ghost', size: 'm'});


const MyHeader = ({currentSearchValue = ''}) => {
  const logoModule = (
      <HeaderLogo>
        <Text as='header'>АО "ИНЛАЙН ГРУП"</Text>
      </HeaderLogo>
  );

  const menuModule = <HeaderMenu items={aMenuData} />;

  const searchModule = (
    <HeaderSearchBar
      placeholder='Корыто на продажу'
      label="поиск"
      value={currentSearchValue}/>
  );

  const loginModule = (
    <HeaderLogin 
      isLogged={true}  
      isMinified={true}
      personName="Евгений Туровский"
      personStatus="available"
      personAvatarUrl='https://vk.com/detrimon'
    />
  )

  const buttonModule = <HeaderButton iconLeft={myIconCancel}/>

  return (
    <Header leftSide={
      <>
        <HeaderModule children={logoModule} />
        <HeaderModule indent='m' children={searchModule} />
        <HeaderModule indent='m' children={menuModule} />
      </>
    } rightSide={
      <>
        <HeaderModule children={buttonModule} />
        <HeaderModule indent='m' children={loginModule} />
      </>
    }/>

  )
}

export default MyHeader;

/** Header
 * Компонент используется как заготовка для шапки проекта. Внутрь включаются различные модули, 
 * которые нужны в шапке (логотип, поиск, меню, какие-то кнопки и т.д..)
 * 
 * Header располагается вверху и занимает всю ширину экрана, сбоков отступы 'space-l'
 * 
 * Header состоит из правой части. 
 *  <Header leftSide={модули в виде JSX} rightSide={модули в виде JSX} />
 *  *! Для Header есть свойства: leftSide, rightSide и className
 * 
 * Чтобы добавить модуль, его нужно обернуть в тэг <HeaderModule>...</HeaderModule>
 * Модули:
 *  leftSide ::
 *    HeaderLogo
 *    HeaderMenu
 *    HeaderSearchBar
 *  rightSide ::
 *    HeaderLogin
 *  в любую часть ::
 *    HeaderButton
 * 
 * 
 *    
 */

/** HeaderModule
 * Это контейнер для любого модуля, размещенного в компоненте Header.
 * 
 * indent - отступ слева, чтобы модули не слипались :: 's', 'm', 'l'
 * className - можно задать свои css-классы
 */