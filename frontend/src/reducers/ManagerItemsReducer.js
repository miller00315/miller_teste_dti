import * as ACTIONS from '../actions/ManagerItemsTypes';

const INITIAL_STATE = {
  loading: false,
  requestError: null,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.UPDATE_ITEM:
      return {...state, loading: true};
    case ACTIONS.UPDATE_ITEM_SUCCESS:
      return {...state, loading: false, requestError: null};
    case ACTIONS.UPDATE_ITEM_FAIL:
      return {...state, loading: false, requestError: action.payload};
    case ACTIONS.CREATE_ITEM:
      return {...state, loading: true};
    case ACTIONS.CREATE_ITEM_SUCCESS:
      return {...state, loading: false, requestError: null};
    case ACTIONS.CREATE_ITEM_FAIL:
      return {...state, loading: false, requestError: action.payload};
    case ACTIONS.CLEAN_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}