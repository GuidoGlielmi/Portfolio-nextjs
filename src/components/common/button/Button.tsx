import styles from './Button.module.css';

interface ButtonProps {
  size: string;
  children: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({size, children}) => {
  return <button className={`${styles.button} ${styles[size]}`}>{children}</button>;
};
export default Button;
