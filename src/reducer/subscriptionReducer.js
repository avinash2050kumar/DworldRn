import {SAVE_SUBSCRIPTION_AFTER_PAYMENT,SET_USER_SUBSCRIPTION,RESET_SUBSCRIPTION
} from "../actions/type";

const initialState={
    boughtSubscription:null,
    userSubscription:[],
}

const subscription = (
    state = initialState,
    action
) => {
    switch (action.type) {
       case SAVE_SUBSCRIPTION_AFTER_PAYMENT:
            return {...state,boughtSubscription: action.payload}

       case SET_USER_SUBSCRIPTION:
            return {...state,userSubscription: action.payload}

       case RESET_SUBSCRIPTION:
            return initialState

        default:
            return state;
    }
};

export default subscription;
