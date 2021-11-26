import { useMemo } from 'react';
import { connector, TPropsFromRedux } from './connector';
import { TIMEOUT_600, LABELS, PLACEHOLDERS } from '../constants';
import { defaultRule } from '../constants/rules';
import {
  inpStreet,
  inpStreetItem,
  inpStreetSuggest,
  inpHouseNumber,
  inpBuzzer,
  inpTextArea,
  idFormAddress,
} from './idNames';

import { Form, Input, AutoComplete } from 'antd';

import { TStep2Form } from '../types';

const { TextArea } = Input;

let timeoutTimer: ReturnType<typeof setTimeout>;

const Step2Form = ({
  form,
  formData,
  aSuggestedAddress,
  suggestDaDataAddress,
  saveFormData,
}: TStep2Form & TPropsFromRedux) => {
  const suggestedValue = useMemo(() => {
    return aSuggestedAddress.map((address) => ({
      label: address.value,
      value: address.value,
      data: address.data,
    }));
  }, [aSuggestedAddress]);

  return (
    <Form
      form={form}
      name={idFormAddress}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      fields={[
        { name: inpStreet, value: formData.inpStreetItem },
        { name: inpStreetSuggest, value: formData.inpStreetSuggest },
        { name: inpHouseNumber, value: formData.inpHouseNumber },
        { name: inpBuzzer, value: formData.inpBuzzer },
        { name: inpTextArea, value: formData.inpTextArea },
      ]}
    >
      <Form.Item
        name={inpStreetItem}
        label={LABELS.ADDRESS}
        rules={[defaultRule]}
      >
        <AutoComplete
          options={suggestedValue}
          onChange={(value) => {
            clearTimeout(timeoutTimer);
            timeoutTimer = setTimeout(() => {
              suggestDaDataAddress(value);
            }, TIMEOUT_600);
          }}
          onSelect={(_, option) => {
            saveFormData({
              inpHouseNumber: option.data.house,
              inpStreetSuggest: option.data.street_with_type,
            });
          }}
          placeholder={PLACEHOLDERS.INPUT_DELIVERY_ADDRESS}
        >
          <Input name={inpStreet} />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name={inpStreetSuggest}
        label={LABELS.STREET}
        rules={[defaultRule]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        name={inpHouseNumber}
        label={LABELS.HOUSENUMBER}
        rules={[defaultRule]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item name={inpBuzzer} label={LABELS.BUZZER}>
        <Input />
      </Form.Item>

      <Form.Item name={inpTextArea} label={LABELS.ADD_INFO}>
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default connector(Step2Form);
