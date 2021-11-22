import { useState, useMemo } from 'react';
import { Form, Input, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { suggestDaDataAddress } from '../../../actions/actionCreators/myTable';
import { RootState } from '../../../redux/store';
import { getFormDataSelector, suggestedAddress } from '../../../redux/selector';
import { saveFormData } from '../../../actions/actionCreators';

const { TextArea } = Input;

const TIMEOUT = 600;
let timeoutTimer: any;

const defaultRule = {
  required: true,
  message: 'Обязательное поле !!!!!',
  whitespace: true,
};

const suggestAddress = (e: any) => {
  const value = e.target.value;
  suggestDaDataAddress(value);
};

const initialSelectedAddress = {
  street_with_type: '',
  house: '',
};

const Step2Form = ({
  form,
  formData,
  aSuggestedAddress,
  suggestDaDataAddress,
  saveFormData,
}: any) => {
  const [selectedAddress, setSelectedAddress] = useState(
    initialSelectedAddress
  );
  const [addressAutoCompleteValue, setAddressAutoCompleteValue] = useState('');

  const suggestedValue = useMemo(() => {
    return aSuggestedAddress.map((address: any) => ({
      label: address.value,
      value: address.value,
      data: address.data,
    }));
  }, [aSuggestedAddress]);

  return (
    <Form
      form={form}
      name="form2"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      fields={[
        { name: 'inpStreet', value: formData.inpStreet },
        { name: 'inpStreetSuggest', value: formData.inpStreetSuggest },
        { name: 'inpHouseNumber', value: formData.inpHouseNumber },
        { name: 'inpBuzzer', value: formData.inpBuzzer },
        { name: 'inpTextArea', value: formData.inpTextArea },
      ]}
    >
      <Form.Item
        name="inpStreetItem"
        label="Адрес:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <AutoComplete
          options={suggestedValue}
          onChange={(value) => {
            clearTimeout(timeoutTimer);
            timeoutTimer = setTimeout(() => {
              suggestDaDataAddress(value);
            }, TIMEOUT);
          }}
          onSelect={(value, option) => {
            // setAddressAutoCompleteValue(option.value);
            saveFormData({
              inpHouseNumber: option.data.house,
              inpStreetSuggest: option.data.street_with_type,
            });
            // setSelectedAddress({
            //   inpHouseNumber: option.data.house,
            //   street_with_type: option.data.street_with_type,
            // });
          }}
          placeholder="Введите адрес доставки"
        >
          <Input name="inpStreet" />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="inpStreetSuggest" label="Улица:" rules={[defaultRule]}>
        <Input name="myInput" disabled />
      </Form.Item>

      <Form.Item
        name="inpHouseNumber"
        label="Номер дома:"
        rules={[defaultRule]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item name="inpBuzzer" label="Домофон:">
        <Input />
      </Form.Item>

      <Form.Item name="inpTextArea" label="Доп. информация">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  formData: getFormDataSelector(state),
  aSuggestedAddress: suggestedAddress(state),
});

const mapDispatchToProps = {
  suggestDaDataAddress,
  saveFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2Form);
