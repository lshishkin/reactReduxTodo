import { UserInterface, TaskInterface } from "../components/tasks/types";

export interface IApplicationState {
  tasks: taskReducerInterface;
}

export interface taskReducerInterface {
  tasks: TaskInterface[];
  users: UserInterface[];
  load: boolean;
}
