import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ISuggestions } from '../../http/services/DaData/DaDataService';
import daDataService from '../../http/services/DaData/DaDataService';
import { updateAddressSuggest } from '../actionCreators';
import { suggestDaDataAddress as suggestDaDataAddress_ActionCreator } from '../actionCreators';

export function* suggestDaDataAddress(
  action: ReturnType<typeof suggestDaDataAddress_ActionCreator>
) {
  const { payload } = action;

  try {
    const response: AxiosResponse<ISuggestions, any> = yield call(
      daDataService.suggestAddress,
      payload
    );
    if (response.status === 200) {
      const aSuggestions = response.data.suggestions;
      yield put(updateAddressSuggest(aSuggestions));
      return;
    }
    throw new Error('response.status не равен 200.. ');
  } catch (error) {
    console.log('Ууупс, какая-то ошибка.');
  }
}
