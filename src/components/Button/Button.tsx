import React, { FC } from 'react'
import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  color: "green" | "blue" | "red";
}

export const Button: FC<ButtonProps> = ({ children, color, onClick, ...props }) => {
  const className = `${styles.button} ${styles[`button_${color}`]}`

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}