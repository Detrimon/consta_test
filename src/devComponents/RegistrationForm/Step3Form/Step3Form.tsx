import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';

const defaultRule = {
  required: true,
  message: 'Обязательное поле !!!!!',
  whitespace: true,
};

const Step3Form = ({ form }: any) => {
  return (
    <Form
      form={form}
      name="form3"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        label="Кредитка"
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="inpCreditCard"
          label="Номер:"
          rules={[defaultRule]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <MaskedInput mask="1111 1111 1111 1111" />
        </Form.Item>

        <Form.Item
          name="inpCode"
          label="Код:"
          rules={[
            defaultRule,
            {
              validator: async (_, value) => {
                const rChecker = /^\d{3,3}$/;
                if (!rChecker.test(value)) {
                  return Promise.reject(
                    new Error('пин-код состоит из 3х цифр')
                  );
                }
              },
            },
          ]}
          style={{ display: 'inline-block', width: '50%', marginLeft: '8px' }}
        >
          <Input />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default Step3Form;
