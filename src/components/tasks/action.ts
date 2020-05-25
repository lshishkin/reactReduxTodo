import {
  GET_TASKS,
  GET_USERS,
  SET_TASK,
  SET_LOAD
} from "../../utils/constants";
import { RequestState } from "../../utils/constants";
import { TaskInterface, SetTaskInterface, SetLoadInterface } from "./types";
import { Dispatch } from "redux";

export const getTasks = () => (dispatch: any) => {
  dispatch(setLoad(true));
  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then(response => response.json())
    .then(json => {
      dispatch({ type: GET_TASKS + RequestState.SUCCESS, payload: json });
    })
    .catch(error => {
      dispatch({ type: GET_TASKS + RequestState.FAIL });
    });
};

export const getUsers = () => (dispatch: any) => {
  dispatch(setLoad(true));
  fetch("https://jsonplaceholder.typicode.com/users/")
    .then(response => response.json())
    .then(json => {
      dispatch({ type: GET_USERS + RequestState.SUCCESS, payload: json });
    })
    .catch(error => {
      dispatch({ type: GET_USERS + RequestState.FAIL });
    });
};

export const setTask = (task: TaskInterface) => (
  dispatch: Dispatch<SetTaskInterface>
) => {
  dispatch({ type: SET_TASK, payload: task });
};
export const setLoad = (status: boolean) => (
  dispatch: Dispatch<SetLoadInterface>
) => {
  dispatch({ type: SET_LOAD, payload: status });
};
