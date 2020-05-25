import React,{useEffect} from "react";
import { useFormik, } from "formik";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import { setTask, } from "../tasks/action";
import {UserInterface, TaskInterface} from '../tasks/types' 
import {IApplicationState} from '../../store/types'
import CircularProgress from "@material-ui/core/CircularProgress";

const Task = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const task = useSelector((state:IApplicationState) => state.tasks.tasks.find((item:TaskInterface) => item.id.toString() === id.toString()));
  const load = useSelector((state:IApplicationState) => state.tasks.load);const user = useSelector((state:IApplicationState) => state.tasks.users.find((item:UserInterface)=>item.id.toString()===task?.userId.toString()));
  const formik = useFormik({
    initialValues: {
      completed: '',
      userName: '',
      title: ''
    },
    onSubmit: values => {
      dispatch(setTask({...(task as TaskInterface),completed:JSON.parse(values.completed),title:values.title}))
      history.push(`/`)
    }
  });


  useEffect(() => {
   if(task&&user){
    formik.setValues({completed: task.completed.toString(),
      userName: user.username,
      title: task.title})
   }
  }, [task,user]);
 
  return load? <CircularProgress disableShrink />:(
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Статус</label>
      <br/>
      <Select
        name="completed"
        onChange={formik.handleChange}
        value={formik.values.completed}
      >
        <MenuItem value={"true"}>Выполнено</MenuItem>
        <MenuItem value={"false"}>Не выполнено</MenuItem>
      </Select>
      <br/>
      <label htmlFor="email">Исполнитель</label>
      <br />
      <TextField
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.userName}
        
        variant="outlined"
        disabled

      />
      <br />
      <label htmlFor="email">Email Address</label>
      <br />
      <TextField
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        variant="outlined"
        multiline
        rows={4}
      />
      <br />
    
      <Button type="submit" onClick={() => history.push(`/`)}>Отмена</Button>
      <Button type="submit">Сохранить</Button>
    </form>
  );
};

export default Task;
