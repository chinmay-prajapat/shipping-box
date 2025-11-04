import LogoIcon from "@/app/components/atoms/LogoIcon/page";
import styles from "./style.module.css";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <LogoIcon />
      <span className={styles.logoText}>Shipping Box</span>
    </div>
  );
};

export default Logo;
