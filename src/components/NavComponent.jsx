import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/nav.module.css";

function NavComponent({ title, user, balance, tokens }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInfo}>
        <h3>{title}</h3>
        <div>{user}</div>
        <div>{balance} ETH</div>
        <div>{tokens} PKR</div>
      </div>
      <div className={styles.navigation}>
        <Link to="/">
          <div className={styles.navItem}>Home</div>
        </Link>
        <Link to="buy-pkr">
          <div className={styles.navItem}>Buy PKR</div>
        </Link>
      </div>
    </nav>
  );
}

export default NavComponent;
