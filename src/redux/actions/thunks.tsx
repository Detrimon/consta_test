import { AnyAction } from 'redux';
import { breadcrumbsSelector } from '../selector';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import React from 'react';

// export const changeBreadcrumbsPath = (item, event:React.SyntheticEvent): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {

//   event.preventDefault();

//   const state = getState();
//   const aCurrentBreadcrumbs = breadcrumbsSelector(state);

//   const nBreadcrumbsLength = aCurrentBreadcrumbs.length;

//   if (item === aCurrentBreadcrumbs[nBreadcrumbsLength - 1]) {
//     return;
//   }

//   const aNewBreadcrumbs = aCurrentBreadcrumbs.filter(it => item.level >= it.level)

//   dispatch({type: 'CHANGE_BREADCRUMBS_PATH', items: aNewBreadcrumbs});
// }
