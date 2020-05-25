export interface TaskInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  username?: string;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
}

export interface SetTaskInterface {
  type: string;
  payload: TaskInterface;
}
export interface SetLoadInterface {
  type: string;
  payload: boolean;
}
