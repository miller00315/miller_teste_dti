import axios from 'axios';
import _ from 'lodash';

import * as ACTIONS from './ManagerItemsTypes';

export const createItem = product => {
  return dispatch => {
    dispatch({type: ACTIONS.CREATE_ITEM});
    axios
      .post('http://10.0.2.2:3000/products', {product})
      .then(res => {
        if(res.status === 201) {
          dispatch({type: ACTIONS.CREATE_ITEM_SUCCESS});
        } else {
          dispatch({type: ACTIONS.CREATE_ITEM_FAIL, payload: `Erro ${res.status}`});
        }
      })
      .catch(error => dispatch({type: ACTIONS.CREATE_ITEM_FAIL, payload: error.message}));
  };
}

export const updateItem = product => {
  return dispatch => {
    dispatch({type: ACTIONS.UPDATE_ITEM});
    axios
      .put(`http://10.0.2.2:3000/products/${product.id}`, {product})
      .then(res => {
        if(res.status === 200) {
          dispatch({type: ACTIONS.UPDATE_ITEM_SUCCESS});
        } else {
          dispatch({type: ACTIONS.UPDATE_ITEM_FAIL, payload: `Erro ${res.status}`});
        }
      })
      .catch(error => dispatch({type: ACTIONS.UPDATE_ITEM_FAIL, payload: error.message}));
  };
}

export const cleanData = () => ({type: ACTIONS.CLEAN_DATA});