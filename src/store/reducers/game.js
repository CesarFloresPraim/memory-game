
import * as actionTypes from "../action-types";

let initialState = {
  overState: "Game Over",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_OVER_STATUS:
      return {
        ...state,
        overState: action.payload,
      };

    default:
      return state;
  }
}
export default reducer;
