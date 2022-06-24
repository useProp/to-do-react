import {ADD_TASK, FETCH_TASKS, REMOVE_TASK, SHOW_LOADER} from "../types";

const handlers = {
  [ADD_TASK]: (state, { payload }) => ({
    ...state,
    tasks: [...state.tasks, payload],
  }),
  [REMOVE_TASK]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== payload),
  }),
  [FETCH_TASKS]: (state, { payload }) => ({
    ...state,
    tasks: payload,
    loading: false,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    loading: true,
  }),
  DEFAULT: state => state,
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}
