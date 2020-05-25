import React, { useState, useMemo } from "react";
import {  useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {IApplicationState} from '../../../../store/types'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable() {
  const classes = useStyles();
  let history = useHistory();
  const [filter, setFilter] = useState({ completed: 0 });
  const tasks = useSelector((state:IApplicationState) => state.tasks.tasks.map(item=>({...item,username:state.tasks.users.find(itemFinde=>itemFinde.id===item.userId)?.username})));
  const load = useSelector((state:IApplicationState) => state.tasks.load);
  const filterdData = useMemo(()=>tasks.filter((item:any) => {
    return Object.entries(filter).every(([key, value]:any) => {
      if (typeof item[key] === "string") {
        return item[key].toLowerCase().includes(value.toLowerCase());
      } else if (typeof item[key] === "boolean") {
        if (value === 1) {
          return item[key] === true;
        }
        if (value === 2) {
          return item[key] === false;
        } else {
          return true;
        }
      }
      return false
    });
  }),[filter,tasks]);

 

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(filter => ({ ...filter, [name]: value }));
  };

  return load? <CircularProgress disableShrink />:<div>
       <Typography variant="h2"  gutterBottom>Список дел ({filterdData.length})</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <p>Статус</p>
              <Select
                name="completed"
                onChange={handlerOnChange as any}
                value={filter.completed}
              >
                <MenuItem value={0}>Все</MenuItem>
                <MenuItem value={1}>Выполнено</MenuItem>
                <MenuItem value={2}>Не выполнено</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <p>Исполнитель</p>
              <TextField name="username" onChange={handlerOnChange} />
            </TableCell>
            <TableCell>
              <p>Название</p>
              <TextField name="title" onChange={handlerOnChange} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ cursor: "pointer" }}>
          {filterdData.map(task => (
            <TableRow
              key={task.id}
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/task/${task.id}`)}
            >
              <TableCell>
                {task.completed ? "Выполнено" : "Не выполнено"}
              </TableCell>
              <TableCell>{task.username}</TableCell>
              <TableCell>{task.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  
}
