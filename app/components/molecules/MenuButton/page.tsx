import styles from "./style.module.css";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  return (
    <button
      className={styles.menuButton}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span className={styles.menuIcon}>
        <span className={isOpen ? styles.menuIconOpen : ""}></span>
        <span className={isOpen ? styles.menuIconOpen : ""}></span>
        <span className={isOpen ? styles.menuIconOpen : ""}></span>
      </span>
    </button>
  );
};

export default MenuButton;
