import axios from 'axios';
import { baseDataAPIUrl } from '../constants/env';

export default axios.create({
  baseURL: baseDataAPIUrl,
  headers: {
    'Content-type': 'application/json',
  },
});
