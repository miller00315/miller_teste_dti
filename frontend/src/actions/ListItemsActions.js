import axios from 'axios';
import _ from 'lodash';

import * as ACTIONS from './ListItemsTypes';
import {compare} from '../utils/StringsUtils';

export const fetchData = () => {
  return dispatch => {
    getDataFromDataBase(dispatch);
  };
};

export const selectItem = (selectedItem, oldSelectedItem) => {
  const newSelectedItem = (selectedItem, oldSelectedItem) ? null : selectedItem;
  return {type: ACTIONS.SELECT_ITEM, payload: newSelectedItem};
};

export const deleteItem = item => {
  return dispatch => {
    dispatch({type: ACTIONS.DELETE_ITEM});
    axios
      .delete(`http://10.0.2.2:3000/products/${item.id}`)
      .then(res => {
        if(res.status === 200) {
          dispatch({type: ACTIONS.DELETE_ITEM_SUCCESS});
          getDataFromDataBase(dispatch);
        } else {
          console.log('item no deleted')
          dispatch({type: ACTIONS.DELETE_ITEM_FAILED, payload: `Erro ${res.status}`});
        }
      })
      .catch(error => dispatch({type: ACTIONS.DELETE_ITEM_FAILED, payload: error.message}));
  };
}

export const getDataFromDataBase = dispatch => {
  dispatch({type: ACTIONS.FETCH_DATA});

  axios
    .get('http://10.0.2.2:3000/products')
    .then(res => {
      if(res.status === 200) {
        dispatch({type: ACTIONS.FETCH_DATA_SUCCESS, payload: res.data.products.sort(compare)});
      } else {
        dispatch({type: ACTIONS.FETCH_DATA_FAILED, payload: `Erro ${res.status}`});
      }
    })
    .catch(error => dispatch({type: ACTIONS.FETCH_DATA_FAILED, payload: error.message}));
};

export const cleanData = () => ({type: ACTIONS.CLEAN_DATA});

