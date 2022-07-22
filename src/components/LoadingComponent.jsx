import React from "react";

import styles from "./css/loading.module.css";

function LoadingComponent({ message }) {
  return <div className={styles.container}>{message}...</div>;
}

export default LoadingComponent;
