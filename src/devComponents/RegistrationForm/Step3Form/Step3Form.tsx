import { Form, Input } from 'antd';
import MaskedInput from 'antd-mask-input';

import { defaultRule } from '../constants/rules';
import { idFormCreditCard, inpCreditCard, inpCode } from './idNames';
import { LABELS, ERROR_MESSAGES } from '../constants';

import { TStep3Form } from '../types';

const Step3Form = ({ form }: TStep3Form) => {
  return (
    <Form
      form={form}
      name={idFormCreditCard}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        label={LABELS.CREDIT_CARD}
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name={inpCreditCard}
          label={LABELS.CREDIT_CARD_NUMBER}
          rules={[defaultRule]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <MaskedInput mask="1111 1111 1111 1111" />
        </Form.Item>

        <Form.Item
          name={inpCode}
          label={LABELS.CREDIT_CARD_PIN}
          rules={[
            defaultRule,
            {
              validator: async (_, value) => {
                const rChecker = /^\d{3,3}$/;
                if (!rChecker.test(value)) {
                  return Promise.reject(
                    new Error(ERROR_MESSAGES.PIN_HAS_3_DIGITS)
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
