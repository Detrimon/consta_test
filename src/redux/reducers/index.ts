import { combineReducers } from 'redux';
import { breadcrumbs } from './breadcrumbs';
import { registrationForm } from './registrationForm';
import { myTable } from './myTable';

const rootReducer = combineReducers({
  breadcrumbs,
  myTable,
  registrationForm,
});

export default rootReducer;
