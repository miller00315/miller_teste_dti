import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

import Routes from './Routes';

export default props => (
  <StoreProvider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
    <Routes />
  </StoreProvider>
);