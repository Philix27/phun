import React from "react";
import styles from "./styles.module.scss";

export default function HeroComp() {
  return (
    <div className={styles.container} id="hero">
      <div className={styles.inner_container}>
        <div className={styles.text_content}>
          <h1>Money Streaming</h1>
          <p>
            Stream salaries to your employees in real-time through out the
            month.
          </p>
        </div>
      </div>
    </div>
  );
}
