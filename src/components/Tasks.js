import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Tasks = ({ tasks, handleRemove }) => (
  <TransitionGroup component={'ul'} className={'list-group'}>
    {tasks.map(task => (
      <CSSTransition
        key={task.id}
        classNames={'task'}
        timeout={600}
      >
        <li className={'list-group-item task'}>
          <div>
            <strong>{task.title}</strong>
            <small>{task.date}</small>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleRemove(task.id)}
          >&times;</button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default Tasks;
