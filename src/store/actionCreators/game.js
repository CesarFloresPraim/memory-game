import * as actionTypes from "../action-types";


export const ChangeOverStatus = (value) => (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_OVER_STATUS, payload: value });
};



