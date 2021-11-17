import { combineReducers } from 'redux';
import { breadcrumbs } from './breadcrumbs';
import { myTable } from './myTable';

export default combineReducers({
  breadcrumbs,
  myTable,
});
