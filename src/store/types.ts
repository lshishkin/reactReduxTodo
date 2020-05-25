import { UserInterface, TaskInterface } from "../components/tasks/types";

export interface IApplicationState {
  tasks: taskReducerIntrtface;
}

export interface taskReducerIntrtface {
  tasks: TaskInterface[];
  users: UserInterface[];
  load: boolean;
}
