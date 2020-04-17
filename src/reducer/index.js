import { combineReducers } from "redux";

import msg from "./appMsgReducer";
import intro from "./introReducer";
import chooseProfileVisibility from "./chooseProfileReducer";
import AuthReducer from "./authReducer";
import home from "./homeReducer";
import driverReducer from "./driverReducer";
import language from "./languageReducer";
import main from "./mainReducer";
import owner from "./ownerReducer";
import lease from "./leaseReducer";

export default combineReducers({
	intro,
	profileVisibility: chooseProfileVisibility,
	msg,
	auth: AuthReducer,
	home,
	driver: driverReducer,
	language,
	main,
	owner,
	lease
});
