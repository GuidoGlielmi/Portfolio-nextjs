import styles from './CircleButton.module.css';

interface CircleButtonProps {
  action: () => void;
  children: JSX.Element;
}

const CircleButton: React.FC<CircleButtonProps> = ({action, children}) => {
  return (
    <div className={styles.button} onClick={action}>
      {children}
    </div>
  );
};

export default CircleButton;
