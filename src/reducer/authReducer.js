import {
  SET_AUTH_CLIENT_ID,
  SET_SUCCESSFUL_LOGIN,
  SET_LOGOUT,
  RESET_AUTH,
  SET_PROFILE_IMAGE_URL,
  SET_CLIENT_ID,
  UPDATE_ROLE,
} from '../actions/type';

const authReducer = (
  state = {
    ClientId: 0,
    isLoginSuccessFul: false,
    Email: '',
    Mobile: '',
    FirstName: '',
    LastName: '',
    ClientTypeId: 0,
    ProfileURL: '',
    IsDriver: false,
    IsLeasingFirm: false,
    IsOwner: false,
  },
  action,
) => {
  switch (action.type) {
    case RESET_AUTH:
      return {...authReducer};

    case UPDATE_ROLE:
      console.log('I am her', action.payload);
      let updateState = state;
      if (action.payload == 1) updateState = {...state, IsDriver: true};

      if (action.payload == 2) updateState = {...state, IsOwner: true};

      if (action.payload == 3) updateState = {...state, IsLeasingFirm: true};

      return updateState;

    case SET_AUTH_CLIENT_ID:
      const {ClientTypeId, ClientId, value} = action.payload;
      return {
        ...state,
        ClientTypeId: ClientTypeId ? ClientTypeId : state.ClientTypeId,
        ClientId: ClientId ? ClientId : state.ClientId,
      };

    case SET_PROFILE_IMAGE_URL:
      return {...state, ProfileURL: action.payload};

    case SET_SUCCESSFUL_LOGIN:
      return {
        ...state,
        ...action.payload.value,
        isLoginSuccessFul: action.payload.successLogin,
      };

    case SET_LOGOUT:
      return {...state, isLoginSuccessFul: false};

    case SET_CLIENT_ID:
      return {...state, ClientTypeId: action.payload * 1};

    default:
      return state;
  }
};

export default authReducer;
