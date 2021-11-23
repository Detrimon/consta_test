import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getFormDataSelector } from '../../../redux/selector';

import {
  FORMATS,
  GENDER,
  ERROR_MESSAGES,
  LABELS,
  TXT_ERR_BIRTHDAY_NOT_CHOOSEN,
  TXT_ERR_PASSPORT_SERIES,
  TXT_ERR_PASSPORT_NUMBER,
} from '../constants';

import {
  inpSurname,
  inpName,
  inpPatronymic,
  pickBirthday,
  chooseGender,
  inpPassSeries,
  inpPassNumber,
  idFormPersonData,
} from './idNames';

import { defaultRule } from '../constants/rules';

import { Form, Input, DatePicker, Radio } from 'antd';
import MaskedInput from 'antd-mask-input';

const checkForWhitespaces = async (_: any, value: any) => {
  const rWhitespace = /[\S]\s{1,}[\S]/;
  const isWhitespaceBetweenWords = rWhitespace.test(value);

  if (isWhitespaceBetweenWords) {
    return Promise.reject(new Error(ERROR_MESSAGES.WHITESPACES_IN_TEXT));
  }
  return true;
};

const Step1Form = ({ form, formData }: any) => {
  return (
    <Form
      form={form}
      name={idFormPersonData}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      fields={[
        { name: inpSurname, value: formData.inpSurname },
        { name: inpName, value: formData.inpName },
        { name: inpPatronymic, value: formData.inpPatronymic },
        { name: pickBirthday, value: formData.pickBirthday },
        { name: chooseGender, value: formData.chooseGender },
        { name: inpPassSeries, value: formData.inpPassSeries },
        { name: inpPassNumber, value: formData.inpPassNumber },
      ]}
    >
      <Form.Item
        name={inpSurname}
        label={LABELS.SURNAME}
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
        name={inpName}
        label={LABELS.NAME}
        rules={[defaultRule, { validator: checkForWhitespaces }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={inpPatronymic}
        label={LABELS.PATRONYMIC}
        rules={[defaultRule, { validator: checkForWhitespaces }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={pickBirthday}
        label={LABELS.BIRTHDAY}
        required
        rules={[
          {
            type: 'object' as const,
            required: true,
            message: TXT_ERR_BIRTHDAY_NOT_CHOOSEN,
          },
        ]}
      >
        <DatePicker format={FORMATS.DATE} />
      </Form.Item>

      <Form.Item name={chooseGender} label={LABELS.GENDER}>
        <Radio.Group value={GENDER.MALE}>
          <Radio.Button value={GENDER.MALE}>{GENDER.MALE}</Radio.Button>
          <Radio.Button value={GENDER.FEMALE}>{GENDER.FEMALE}</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label={LABELS.PASSPORT}
        required
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name={inpPassSeries}
          rules={[{ required: true, message: TXT_ERR_PASSPORT_SERIES }]}
          style={{
            display: 'inline-block',
            width: 'calc(30% - 8px)',
          }}
        >
          <MaskedInput mask="1111" style={{ textAlign: 'right' }} />
        </Form.Item>

        <Form.Item
          name={inpPassNumber}
          rules={[{ required: true, message: TXT_ERR_PASSPORT_NUMBER }]}
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
