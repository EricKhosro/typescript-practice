import React, { useState, useRef } from "react";
import { Todo } from "../model";
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdOutlineDone } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editHandler = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: event.target.value } : todo
      )
    );
  };
  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(false);
      }}
    >
      {!isEditing ? (
        <span
          className={`todos__single--text ${
            todo.isDone && "todos__single--text--done"
          }`}
        >
          {todo.todo}
        </span>
      ) : (
        <input
          value={todo.todo}
          onChange={(e) => editHandler(todo.id, e)}
          ref={inputRef}
        />
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            setIsEditing(!isEditing);
            inputRef.current?.focus();
          }}
        >
          <GrEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
