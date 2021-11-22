import axios from 'axios';
import {
  baseDataAPIUrl,
  dadata_api_url,
  dadata_api_key,
} from '../constants/env';

export default axios.create({
  baseURL: baseDataAPIUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

export const daDataHttp = axios.create({
  baseURL: dadata_api_url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + dadata_api_key,
  },
});
