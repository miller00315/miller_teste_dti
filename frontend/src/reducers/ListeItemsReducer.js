import * as ACTIONS from '../actions/ListItemsTypes';

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,
  selectedItem: null,
}

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.FETCH_DATA:
      return {...state, loading: true};
    case ACTIONS.FETCH_DATA_SUCCESS:
      return {...state, loading: false, error: null, products: action.payload};
    case ACTIONS.FETCH_DATA_FAILED:
      return {...state, loading: false, error: action.payload, products: []};
    case ACTIONS.SELECT_ITEM:
      return {...state, selectedItem: action.payload};
    case ACTIONS.DELETE_ITEM:
      return {...state, loading: true};
    case ACTIONS.DELETE_ITEM_SUCCESS:
      return {...state, error: null};
    case ACTIONS.DELETE_ITEM_FAILED:
      return {...state, loading: false, error: action.payload};
    case ACTIONS.CLEAN_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}