import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

// Root Reducer goes here
import rootReducer from "../reducer";



// Logger Middle ware
const loggerMiddleware = createLogger({
	predicate: (getState, action) => __DEV__
});


// Apply Middleware
const middleware = [thunk , loggerMiddleware];

// Store
const createStoreWithVM = applyMiddleware(...middleware)(createStore)
let store =  createStoreWithVM(rootReducer)

// export default
export default store
