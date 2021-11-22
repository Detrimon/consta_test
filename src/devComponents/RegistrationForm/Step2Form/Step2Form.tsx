import { useState, useMemo } from 'react';
import { Form, Input, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { suggestDaDataAddress } from '../../../actions/actionCreators/myTable';
import { RootState } from '../../../redux/store';
import { suggestedAddress } from '../../../redux/selector';
import { data } from '../../../serviceComponents/MyGrid/fixtures';

const TIMEOUT = 600;
let timeoutTimer: any;

const suggestAddress = (e: any) => {
  const value = e.target.value;
  suggestDaDataAddress(value);
};

const initialSelectedAddress = {
  street_with_type: '',
  house: '',
};

const Step2Form = ({ form, aSuggestedAddress, suggestDaDataAddress }: any) => {
  const [suggestAddressResult, setSuggestAddressResult] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(
    initialSelectedAddress
  );

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
        { name: 'inpStreetSuggest', value: selectedAddress.street_with_type },
        { name: 'inpHouseNumber', value: selectedAddress.house },
      ]}
    >
      <Form.Item
        name="inpStreet"
        label="Улица:"
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
            console.log(value);
            console.log(option);
            debugger;
            setSelectedAddress({
              house: option.data.house,
              street_with_type: option.data.street_with_type,
            });
          }}
          placeholder="начните вводить адрес.. "
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="inpStreetSuggest"
        label="Улица:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
        valuePropName="value"
        initialValue={'sdfsdfsdfs'}
      >
        <Input name="myInput" disabled />
      </Form.Item>

      <Form.Item
        name="inpHouseNumber"
        label="Номер дома:"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input disabled />
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  aSuggestedAddress: suggestedAddress(state),
});

const mapDispatchToProps = {
  suggestDaDataAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2Form);
