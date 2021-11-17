import React, { FunctionComponent } from 'react';
import { isEnvConfigIncomplete } from '../constants/env';

const CheckConfigurationLayout: FunctionComponent<any> = ({
  children = null,
}) => {
  return isEnvConfigIncomplete ? (
    <div>
      Ошибка в конфигурационном файле, не все обязательные параметры указаны
    </div>
  ) : (
    children
  );
};

export default CheckConfigurationLayout;
