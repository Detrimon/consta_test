Импорт компонентов:
import { Form } from 'antd';
import { Input, Button, CheckBox, Select, Radio } from 'antd';
import { Cascader, DatePicker, TimePicker, InputNumber, TreeSelect, Switch } from 'antd';
import { message, Space, Tooltip, Typography, Modal, Avatar, Row, Col, AutoComplete, Mentions, Slider, Upload, Rate }

Импорт ИКОНОК:
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

Импорт ТИПОВ:
import { FormInstance } from 'antd/es/form';

<Form.Item rules={[..., ...]}> --> внутри такой конструкции указываются правила, применяемые к полям

1. { required: true, message: 'Обязательное поле' }
   1.1. { required: true, whitespace: true, message: 'Какое-то сообщение... ' }
2. { type: 'url', warningOnly: true } // ожидает, что вводимый текст будет в формате URL: http(s)://...
3. { type: 'string, min: 6 } // должна быть строка, минимум 6 символов
   { type: 'email', ...}
   { type: 'number', min: 0, max: 99 }
   { type: 'array' }
4. { validator: async (\_, names) => { if (!names || names.length < 2) { return Promise.reject(new Error('At least 2 passengers'))}}}
