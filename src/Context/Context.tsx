import React from "react";
import { createContext, useContext, useReducer } from "react";
import { Todo } from "../model";
import { todoReducer } from "./Reducers";
interface Props {
  children: React.ReactNode;
}

const Todos = createContext<Todo | null>(null);

const Context: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, []);
  return (
    <Todos.Provider value={{ state, dispatch }}>{children}</Todos.Provider>
  );
};

export default Context;
