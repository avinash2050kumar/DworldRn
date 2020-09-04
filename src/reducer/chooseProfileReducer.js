import {
  SET_CHOOSE_PROFILE_VISIBILITY,
  RESET_PROFILE_VISIBILITY,
} from '../actions/type';

const initialState = {
  isChooseProfileVisible: true,
  clientTypeId: 0,
  ClientId: null,
  IsDriver: false,
  IsLeasingFirm: false,
  IsOwner: false,
};

const chooseProfileVisibility = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHOOSE_PROFILE_VISIBILITY:
      const {value} = action.payload;
      return {
        ...state,
        isChooseProfileVisible:
          value !== undefined ? value : state.isChooseProfileVisible,
        ...action.payload.profileObj,
      };

    case RESET_PROFILE_VISIBILITY:
      return {
        ...state,
        clientTypeId: initialState.clientTypeId,
      };

    default:
      return state;
  }
};

export default chooseProfileVisibility;
