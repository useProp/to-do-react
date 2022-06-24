import {FirebaseContext} from "./firebaseContext";
import {useReducer} from "react";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_TASK, FETCH_TASKS, REMOVE_TASK, SHOW_LOADER} from "../types";
import axios from "axios";

const url = process.env.REACT_APP_FIREBASE_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    tasks: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({
    type: SHOW_LOADER,
  });

  const fetchTasks = async () => {
    const res = await axios.get(`${url}/tasks.json`);
    const payload = Object.keys(res.data).map(id => ({
      ...res.data[id],
      id,
    }));
    showLoader();
    dispatch({ type: FETCH_TASKS, payload });
  }

  const addTask = async title => {
    const task = {
      title,
      date: new Date().toJSON(),
    };
    const res = await axios.post(`${url}/tasks.json`, task);
    const payload = {
      ...task,
      id: res.data.name,
    };
    dispatch({ type: ADD_TASK, payload });
  };

  const removeTask = async id => {
    await axios.delete(`${url}/tasks/${id}.json`);
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  }



  return (
    <FirebaseContext.Provider value={{
      fetchTasks,
      addTask,
      removeTask,
      showLoader,
      loading: state.loading,
      tasks: state.tasks,
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}
