const initialState = {
  popupState: false
};

const actionTypes = {
  SHOW_POPUP: "POPUP/SHOW_POPUP",
  HIDE_POPUP: "POPUP/HIDE_POPUP"
};

export const actions = {
  showPopup: () => {
    return (dispatch, getstate) => {
      dispatch(show());
    };
  },
  hidePopup: () => {
    return (dispatch, getstate) => {
      dispatch(hide());
    };
  }
};

const show = () => ({
  type: actionTypes.SHOW_POPUP
});

const hide = () => ({
  type: actionTypes.HIDE_POPUP
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_POPUP:
      return { ...state, popupState: true };
    case actionTypes.HIDE_POPUP:
      return { ...state, popupState: false };
    default:
      return state;
  }
};

export default reducer;

export const getPopupState = state => {
  return state.popUp.popupState;
};
