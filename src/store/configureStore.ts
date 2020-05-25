import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { IApplicationState } from "./types";
import reducers from "./index";

export default (): Store<IApplicationState> => {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
