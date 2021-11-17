import produce from 'immer';
import {CHANGE_BREADCRUMBS_PATH} from '../constants';
import { TPage } from '../../navComponents/MyBreadcrumbs';

type TInitialState = {
  pages: TPage[]
}

const initialState:TInitialState = {
  pages: [{
    label: 'Home',
    link: '/',
  }, {
    label: 'Stories',
    link: '/stories',
  }, {
    label: 'Very Interesting Story',
    link: '/stories/very-interesting-story',
  }]
}

export const breadcrumbs = produce((draft = initialState, action) => {
  const { type, items } = action;

  switch (type) {
    case CHANGE_BREADCRUMBS_PATH:
      draft.pages = items;
      break;
    default:
      return draft;
  }
})