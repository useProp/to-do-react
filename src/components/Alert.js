import React, {useContext, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import {AlertContext} from "../context/alert/alertContext";

const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  return (
    <div>
      <CSSTransition
        in={alert.visible}
        timeout={{
          enter: 500,
          exit: 350,
        }}
        classNames={'alert'}
        mountOnEnter
        unmountOnExit
      >
        <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`} role="alert">
          {alert.text}
          <button onClick={hide} type="button" className="btn-close" aria-label="Close"/>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Alert;
