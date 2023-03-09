import styles from "./styles.module.css";

import igniteLogo from "../../assets/ignit-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Application logo" />
    </header>
  );
}
