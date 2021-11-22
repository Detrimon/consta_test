import { Form, FormInstance, Input, DatePicker, Radio } from 'antd';
import MaskedInput from 'antd-mask-input';
import { connect } from 'react-redux';
import { getFormDataSelector } from '../../../redux/selector';
import { RootState } from '../../../redux/store';

const checkForWhitespaces = async (_: any, value: any) => {
  const rWhitespace = /[\S]\s{1,}[\S]/;
  const isWhitespaceBetweenWords = rWhitespace.test(value);
  console.log(isWhitespaceBetweenWords);

  if (isWhitespaceBetweenWords) {
    return Promise.reject(
      new Error('Значение не должно содержать пробелов между словами')
    );
  }
  return true;
};

const defaultRule = {
  required: true,
  message: 'Обязательное поле !!!!!',
  whitespace: true,
};

const Step1Form = ({ form, formData }: any) => {
  // const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="form1"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      fields={[
        { name: 'inpSurname', value: formData.inpSurname },
        { name: 'inpName', value: formData.inpName },
        { name: 'inpPatronymic', value: formData.inpPatronymic },
        { name: 'pickBirthday', value: formData.pickBirthday },
        { name: 'chooseGender', value: formData.chooseGender },
        { name: 'inpPassSeries', value: formData.inpPassSeries },
        { name: 'inpPassNumber', value: formData.inpPassNumber },
      ]}
    >
      <Form.Item
        name="inpSurname"
        label="Фамилия:"
        rules={[
          defaultRule,
          {
            validator: checkForWhitespaces,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="inpName"
        label="Имя:"
        rules={[defaultRule, { validator: checkForWhitespaces }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="inpPatronymic"
        label="Отчество:"
        rules={[defaultRule, { validator: checkForWhitespaces }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="pickBirthday"
        label="Дата рождения:"
        required
        rules={[
          {
            type: 'object' as const,
            required: true,
            message: 'Выберите дату рождения',
          },
        ]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>

      <Form.Item name="chooseGender" label="Пол:">
        <Radio.Group value={'male'}>
          <Radio.Button value="male">мужской</Radio.Button>
          <Radio.Button value="female">женский</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Паспорт"
        required
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="inpPassSeries"
          rules={[{ required: true, message: 'Введите серию паспорта' }]}
          style={{
            display: 'inline-block',
            width: 'calc(30% - 8px)',
          }}
        >
          <MaskedInput mask="1111" style={{ textAlign: 'right' }} />
        </Form.Item>

        <Form.Item
          name="inpPassNumber"
          rules={[{ required: true, message: 'Введите номер паспорта' }]}
          style={{
            display: 'inline-block',
            marginLeft: '8px',
            width: '60%',
          }}
        >
          <MaskedInput mask="111 111" />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  formData: getFormDataSelector(state),
});

export default connect(mapStateToProps)(Step1Form);
