import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

import ListItems from './app/screens/ListItems';
import ManagerItems from './app/screens/ManagerItems';

export default props => (
  <Router>
    <Scene key="root" >
      <Scene key="products" component={ListItems} title="Produtos" init />
      <Scene key="managerItems" component={ManagerItems} title="Gerenciar produtos" />
    </Scene>
  </Router>
);