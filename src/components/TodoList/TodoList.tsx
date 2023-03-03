import React, { FC } from 'react';
import { useTodo } from '../../utils';
import { TodoPanel } from '../TodoPanel/TodoPanel';
import { TodoItem } from './TodoItem/TodoItem';



export const TodoList: FC = () => {
  const { todos, todoIdForEdit, checkTodo, deleteTodo, selectTodoIdForEdit } = useTodo();
  return (
    <div>
      {todos.map(todo => {
        if (todo.id === todoIdForEdit)
          return <TodoPanel
            key={todo.id}
            mode='edit'
            editTodo={todo} />;
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectTodoIdForEdit={selectTodoIdForEdit}
          />
        );
      })}
    </div>
  )
};
