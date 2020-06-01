import { combineReducers, Reducer} from "redux";
import tasksReducer from "../components/tasks/reducer";
import { IApplicationState } from "./types";

const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>(
  {
    tasks: tasksReducer
  }
);

export default reducers;
