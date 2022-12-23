import styles from './DropDownIcon.module.css';

interface DropDownIconProps {
  onClick: () => void;
  size?: string;
}

const DropDownIcon: React.FC<DropDownIconProps> = ({onClick, size}) => (
  <div onClick={onClick} className={styles.dropDown}>
    <i className='fa-solid fa-chevron-down'></i>
  </div>
);
export default DropDownIcon;
