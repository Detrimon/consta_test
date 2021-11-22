import { Form, Input } from 'antd';

const Step3Form = ({ form }: any) => {
  return (
    <Form form={form} name="form3">
      <Form.Item
        name="inpCreditCard"
        label="Кредитка:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="inpCode"
        label="Код:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Step3Form;
