import {SET_CHOOSE_PROFILE_VISIBILITY, RESET_PROFILE_VISIBILITY} from './type';

export const setChooseProfileVisibility = (
  value,
 profileObj
) => dispatch => {
  dispatch({
    type: SET_CHOOSE_PROFILE_VISIBILITY,
    payload: {value,profileObj},
  });
};

export const resetProfileVisibility = () => dispatch => {
  dispatch({
    type: RESET_PROFILE_VISIBILITY,
  });
};
