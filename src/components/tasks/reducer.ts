import {Reducer} from 'redux'
import {
  RequestState,
  GET_TASKS,
  GET_USERS,
  SET_TASK,
  SET_LOAD
} from "../../utils/constants";
import { TaskInterface } from "./types";
import { taskReducerInterface } from "../../store/types";
const initialState = { tasks: [], users: [], load: false };

const taskReducer:Reducer<taskReducerInterface,{type:string,payload:any}>= (
  data = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case GET_TASKS + RequestState.SUCCESS: {
      return { ...data, tasks: Object.values(action.payload), load: false };
    }
    case GET_TASKS + RequestState.FAIL: {
      return { ...data, tasks: [], load: false };
    }
    case GET_USERS + RequestState.SUCCESS: {
      return { ...data, users: Object.values(action.payload), load: false };
    }
    case GET_USERS + RequestState.FAIL: {
      return { ...data, users: [], load: false };
    }
    case SET_TASK: {
      return {
        ...data,
        tasks: data.tasks.map((item: TaskInterface) =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    }
    case SET_LOAD: {
      return { ...data, load: action.payload };
    }

    default:
      return data;
  }
};

export default taskReducer