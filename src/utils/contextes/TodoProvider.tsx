import React, { FC, ReactNode, useState, useCallback, useMemo } from 'react';
import { v1 } from 'uuid';
import { TodoContext } from './TodoContext';

const DEFAULT_TODO_LIST = [
  { id: v1(), name: "WEB", description: "Internet, HTTP, browser", isDone: true },
  { id: v1(), name: "HTML", description: "Basics, semantic, forms and validations", isDone: true },
  { id: v1(), name: "CSS", description: "Basics, layouts, media queries", isDone: true },
  { id: v1(), name: "JavaScript", description: "Syntax, DOM manipulation, ES6", isDone: true },
  { id: v1(), name: "Git", description: "GitHub", isDone: true },
  { id: v1(), name: "React Fundamentals", description: "Components, life cycle, hooks, props, state", isDone: true },
  { id: v1(), name: "React Advanced", description: "Advanced hooks, state management, API calls, routing", isDone: false },
  { id: v1(), name: "TypeScript", description: "Syntax, compiler, language service", isDone: false },
  { id: v1(), name: "Algorithms", description: "Algorithms, data structures", isDone: false },
];

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState(DEFAULT_TODO_LIST);
  const [todoIdForEdit, setTodoIdForEdit] = useState<Todo['id'] | null>(null);

  const addTodo = useCallback(({ name, description }: Omit<Todo, "isDone" | "id">) => {
    if (name === "" || description === "") return 0;
    setTodos([...todos, { id: v1(), description, name, isDone: false }]);
  }, [todos]);

  const checkTodo = useCallback((id: Todo['id']) => {
    setTodos(todos.map(todo => (todo.id === id) ? { ...todo, isDone: !todo.isDone } : todo));
  }, [todos]);

  const deleteTodo = useCallback((id: Todo['id']) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos]);

  const selectTodoIdForEdit = useCallback((id: Todo['id']) => {
    setTodoIdForEdit(id);
  }, []);

  const changeTodo = useCallback(({ name, description }: Omit<Todo, "isDone" | "id">) => {
    setTodos(todos.map(todo => (todo.id === todoIdForEdit) ? { ...todo, name, description } : todo));
    setTodoIdForEdit(null);
  }, [todos, todoIdForEdit]);

  const value = useMemo(() =>
    ({ todos, checkTodo, deleteTodo, selectTodoIdForEdit, todoIdForEdit, changeTodo, addTodo }),
    [todos, checkTodo, deleteTodo, selectTodoIdForEdit, todoIdForEdit, changeTodo, addTodo]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};