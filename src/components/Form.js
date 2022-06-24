import React, {useContext, useState} from 'react';
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

const Form = () => {
  const [value, setValue] = useState('');
  const { show } = useContext(AlertContext);
  const { addTask } = useContext(FirebaseContext);

  const submitHandler = e => {
    e.preventDefault();

    if (!value.trim()) {
      return show('Task must be filled')
    }

    addTask(value).then(() => {
      show('Task was created!', 'success');
    }).catch(e => {
      show(`Error: ${e.message || 'Something went wrong :('}`, 'danger');
    }).finally(() => {
      setValue('');
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder={'Enter your task here'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
