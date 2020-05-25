export enum RequestState {
  REQUEST = "_REQUEST",
  SUCCESS = "_SUCCESS",
  FAIL = "_FAIL",
  BROADCAST = "_BROADCAST"
}

export enum LoadingStatus {
  Loading = "Loading",
  Resolve = "Resolve",
  Reject = "Reject"
}

export const SET_TASK = "SET_TASK";
export const GET_TASKS = "GET_TASKS";
export const GET_USERS = "GET_USERS";
export const SET_LOAD = "SET_LOAD";
