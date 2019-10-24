import { SET_STATUS, LIKE_STATUS, UNLIKE_STATUS, LOADING_DATA } from "../types";

const initialState = {
  status: [],
  aStatus: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
        loading: false
      };
    case LIKE_STATUS:
    case UNLIKE_STATUS:
      let index = state.status.findIndex(
        aStatus => aStatus.statusId === action.payload.statusId  //aStatus là đại diện cho 1 status, còn mảng status đại diện cho tất cả status
      );
      state.status[index] = action.payload;
      return {
        ...state
      };

    default:
      return state;
  }
}
