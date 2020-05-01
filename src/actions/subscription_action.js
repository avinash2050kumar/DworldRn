import client from "../helper/ApiClient";
import { setAppMessage } from "./message_action";
import {
    RESET_SUBSCRIPTION,
    SAVE_SUBSCRIPTION_AFTER_PAYMENT, SET_USER_SUBSCRIPTION
} from "./type";
import Store from "../store";

export const saveSubscription = payload=> async dispatch => {
    try {
        const res = await client.main.saveSubscription(payload);
        console.log('this is response', res)
        res.status===200&&dispatch(
            setAppMessage("Success", "Successfully Purchased", "success")
        );
        res.status===204&&dispatch(

                setAppMessage("Error", "Something wrong happen", "danger")

        );
        res.status===200&&dispatch({ type: SAVE_SUBSCRIPTION_AFTER_PAYMENT,payload });
        return res
    } catch (e) {
        dispatch(
            setAppMessage("Error", "Unable to save your subscription", "danger")
        );
    }
};

export const getUserSubscription= ()=> async dispatch => {
    try {
        const res = await client.main.getUserSubscription();
        console.log('this is response', res)
        res.status===200&&dispatch({ type: SET_USER_SUBSCRIPTION,payload:res.data });
    } catch (e) {
        dispatch(
            setAppMessage("Error", "Unable to save your subscription", "danger")
        );
    }
};



export const checkSubscription= ()=> async dispatch => {
    try {
        console.log('loasdf',)
        return await client.main.checkSubscription();
    } catch (e) {
        dispatch(
            setAppMessage("Error", "Unable to save your subscription", "danger")
        );
    }
};

export const resetSubscription = () => dispatch=>{
    dispatch({type:RESET_SUBSCRIPTION})
}
