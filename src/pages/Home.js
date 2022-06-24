import React, {useContext, useEffect} from 'react';
import Form from "../components/Form";
import Tasks from "../components/Tasks";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import Loader from "../components/Loader";
import {AlertContext} from "../context/alert/alertContext";

const Home = () => {
  const { loading, tasks, fetchTasks, removeTask} = useContext(FirebaseContext);
  const { show } = useContext(AlertContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRemove = async (id) => {
    await removeTask(id);
    show('Task was deleted!', 'success')
  }

  return (
    <>
      <Form />

      <hr/>

      {loading ? <Loader /> : <Tasks tasks={tasks} handleRemove={handleRemove}/>}

    </>
  );
};

export default Home;
