import React from 'react';
import {combineReducers} from 'redux';

import ListItemsReducer from './ListeItemsReducer';
import ManagerItemsReducer from './ManagerItemsReducer';

export default combineReducers({
  ListItemsReducer,
  ManagerItemsReducer,
});

