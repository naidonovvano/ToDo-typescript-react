import React, { ChangeEvent, useState, FC } from 'react';
import styles from './TodoPanel.module.css';
import { Button } from '../Button/Button';
import { useTodo } from '../../utils';

const DEFAULT_TODO = {
  name: '',
  description: ''
};

interface AddTodoPanelProps {
  mode: "add";
}
interface EditTodoPanelProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "isDone">;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: FC<TodoPanelProps> = (props) => {
  const { changeTodo, addTodo } = useTodo();
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onClick = () => {
    if (isEdit) return changeTodo(todo);
    addTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div className={isEdit ? styles.todo_panel_container_edit : styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            <div>Task name</div>
            <input autoComplete='off' type="text" value={todo.name} id='name' name='name' onChange={onChange} />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="description">
            <div>Description</div>
            <input autoComplete='off' type="text" value={todo.description} id='description' name='description' onChange={onChange} />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button color="blue" onClick={onClick}>ADD</Button>
        )}
        {isEdit && (
          <Button color="green" onClick={onClick}>EDIT</Button>
        )}
      </div>
    </div>
  )
}