import { combineReducers } from 'redux';
import { breadcrumbs } from './breadcrumbs';
import { registrationForm } from './registrationForm';
import { myTable } from './myTable';

export default combineReducers({
  breadcrumbs,
  myTable,
  registrationForm,
});
