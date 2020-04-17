import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Root Reducer goes here
import rootReducer from "../reducer";

// Redux Persist
const persistConfig = {
	key: "root",
	storage,
	blacklist: ["navigation",'msg']
};

// Logger Middle ware
const loggerMiddleware = createLogger({
	predicate: (getState, action) => __DEV__
});

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Apply Middleware
const middleware = [thunk , loggerMiddleware];

// Store
let store = createStore(persistedReducer, applyMiddleware(...middleware));
let persistor = persistStore(store);

// export default
export default () => {
	return { store, persistor };
};
