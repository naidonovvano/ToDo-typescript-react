import React, { FC } from 'react';
import { useTodo } from '../../utils';
import styles from './Header.module.css';

export const Header: FC = () => {
  const { todos } = useTodo();
  return (
    <div className={styles.header_container}>
      <div className={styles.header_title}>
        ToDo list: <b>{todos.length}</b> task(s)
      </div>
    </div>
  )
}