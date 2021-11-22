import { daDataHttp } from '../../http';

class DaDataService {
  suggestAddress(query: string) {
    return daDataHttp.post(
      '/suggest/address',
      JSON.stringify({ query: query })
    );
  }
}

export default new DaDataService();
