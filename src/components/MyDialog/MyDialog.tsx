import Dialog from '../../devComponents/Dialog';
import { useState } from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const handleInputChange = (callback: any, event: any): void => {
  event.preventDefault();
  const value = event.target.value;
  callback(value);
};

const MyDialog = ({ addItem }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [age, setAge] = useState('');

  return (
    <div>
      {isDialogOpen && (
        <Dialog
          title="Добавить пользователя"
          isCancelEnabled={false}
          onOkClicked={(event) => {
            event.preventDefault();
            const formData = {
              surname: surname,
              name: name,
              patronymic: patronymic,
              age: +age,
            };

            addItem(formData, setIsDialogOpen);

            [setSurname, setName, setPatronymic, setAge].forEach((callback) =>
              callback('')
            );

            // setIsDialogOpen(false);
          }}
          onCancelClicked={() => setIsDialogOpen(false)}
        >
          {
            <>
              <div>
                <label htmlFor="inpSurname">Фамилия: </label>
                <input
                  id="inpSurname"
                  type="input"
                  value={surname}
                  onChange={(e) => handleInputChange(setSurname, e)}
                ></input>
              </div>
              <div>
                <label htmlFor="inpName">Имя: </label>
                <input
                  id="inpName"
                  type="input"
                  value={name}
                  onChange={(e) => handleInputChange(setName, e)}
                ></input>
              </div>
              <div>
                <label htmlFor="inpPatronymic">Отчество: </label>
                <input
                  id="inpPatronymic"
                  value={patronymic}
                  onChange={(e) => handleInputChange(setPatronymic, e)}
                ></input>
              </div>
              <div>
                <label htmlFor="inpAge">Возраст: </label>
                <input
                  id="inpAge"
                  value={age}
                  onChange={(e) => handleInputChange(setAge, e)}
                ></input>
              </div>
            </>
          }
        </Dialog>
      )}
      <button
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Открыть диалог...
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addItem: (item: any, setIsDialogOpen: any) =>
    dispatch({
      type: 'ADD_TABLE_ITEM',
      item: item,
      setIsDialogOpen: setIsDialogOpen,
    }),
});

//@ts-ignore
export default connect(null, mapDispatchToProps)(MyDialog);
