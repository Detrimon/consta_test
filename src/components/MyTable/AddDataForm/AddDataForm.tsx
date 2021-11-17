import { connect } from 'react-redux';
import { Form, Input, FormInstance } from 'antd';
import { Button } from '@consta/uikit/Button';
// @ts-ignore
import styles from './AddDataForm.module.css';
import { ADD_TABLE_ITEM } from '../../../constants/redux';

export type TFormData = {
  inpSurname: string;
  inpName: string;
  inpPatronymic: string;
  inpAge: string;
};

type TAddItem = (
  form: FormInstance<any>,
  toCloseModal: () => void
) => {
  type: string;
  form: FormInstance<any>;
  toCloseModal: () => void;
};

type TAddDataForm = {
  toCloseModal: () => void;
  addItem: TAddItem;
};

const AddDataForm = ({ toCloseModal, addItem }: TAddDataForm) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="addDataForm"
      className={styles.container}
    >
      <Form.Item
        name="inpSurname"
        label="Фамилия:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="inpName"
        label="Имя:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="inpPatronymic" label="Отчество:">
        <Input />
      </Form.Item>

      <Form.Item
        name="inpAge"
        label="Возраст:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <div className={styles.action_panel}>
          <Button
            label="Добавить"
            size="s"
            onClick={() => addItem(form, toCloseModal)}
          />
          <span className={styles.separator}></span>
          <Button label="Отменить" size="s" onClick={() => toCloseModal()} />
        </div>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = {
  addItem: (form: FormInstance<any>, toCloseModal: () => void) => ({
    type: ADD_TABLE_ITEM,
    form: form,
    toCloseModal: toCloseModal,
  }),
};

export default connect(null, mapDispatchToProps)(AddDataForm);
