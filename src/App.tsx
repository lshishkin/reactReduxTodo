import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import Tasks from "./components/tasks";
import Task from "./components/task";
import { getTasks, getUsers } from "./components/tasks/action";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getTasks());
      await dispatch(getUsers());
    };
    fetch();
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Tasks />
        </Route>
        <Route path="/task/:id">
          <Task />
        </Route>
      </Switch>
    </Router>
  );
}
