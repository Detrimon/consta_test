
import { Button } from '@consta/uikit/Button';
import { ButtonPropView, ButtonPropSize, ButtonPropWidth, ButtonPropForm } from '@consta/uikit/Button';
import { useState } from 'react';

const MyButton = () => {
  const [view, setView] = useState<ButtonPropView>('primary');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [size, setSize] = useState<ButtonPropSize>('m');
  const [width, setWidth] = useState<ButtonPropWidth>('default');
  const [form, setForm] = useState<ButtonPropForm>('default');

  const setBtnView = (viewType:ButtonPropView) => () => setView(viewType)
  const setBtnDisabled = (isDisabled:boolean) => () => setDisabled(isDisabled);
  const setBtnSize = (btnSize:ButtonPropSize) => () => setSize(btnSize);
  const setBtnWidth = (btnWidth:ButtonPropWidth) => () => setWidth(btnWidth);
  const setBtnForm = (btnForm:ButtonPropForm) => () => setForm(btnForm);

  return (
    <div>
      <Button label="Hello!" view={view} disabled={disabled} size={size} width={width} form={form}/>
      <h5>{`<Button label='Hello!' view=${view} disabled=${disabled} size=${size} width=${width} form=${form}/>`}</h5>
      <div>
        <h4>Current view: {view}</h4>
        <button onClick={setBtnView('primary')}>primary</button>
        <button onClick={setBtnView('secondary')}>secondary</button>
        <button onClick={setBtnView('ghost')}>ghost</button>
        <button onClick={setBtnView('clear')}>clear</button>
      </div>
      <div>
        <h4>disabled? {disabled}</h4>
        <button onClick={setBtnDisabled(true)}>Set Disabled</button>
        <button onClick={setBtnDisabled(false)}>Set Undisabled</button>
      </div>
      <div>
        <h4>size: {size}</h4>
        <button onClick={setBtnSize('xs')}>xs</button>
        <button onClick={setBtnSize('s')}>s</button>
        <button onClick={setBtnSize('m')}>m</button>
        <button onClick={setBtnSize('l')}>l</button>
      </div>
      <div>
        <h4>width: {width}</h4>
        <button onClick={setBtnWidth('full')}>full</button>
        <button onClick={setBtnWidth('default')}>default</button>
      </div>
      <div>
        <h4>form: {form}</h4>
        <button onClick={setBtnForm('default')}>default</button>
        <button onClick={setBtnForm('round')}>round</button>
        <button onClick={setBtnForm('brick')}>brick</button>
        <button onClick={setBtnForm('brickRound')}>brickRound</button>
        <button onClick={setBtnForm('roundBrick')}>roundBrick</button>
        <button onClick={setBtnForm('brickDefault')}>brickDefault</button>
        <button onClick={setBtnForm('defaultBrick')}>defaultBrick</button>
      </div>
    </div>
  )
};



export default MyButton;

/** Button
 * Атрибуты ::
 *  label - текст на кнопке <Button label="Поиск" />
 *  view - указывает на акцент кнопки. Их всего 4-ре: primary, secondary, ghost, clear
 */