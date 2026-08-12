import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>S</span>
        <span className={styles.logoText}>SprintFlow</span>
      </div>

      <div className={styles.navLinks}>
        <a href="#product">Product</a>
        <a href="#features">Features</a>
        <a href="#workflow">Workflow</a>
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.signIn}
          onClick={() => navigate("/login")}
        >Sign In</Button>
        <Button className={styles.getStarted}>Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;