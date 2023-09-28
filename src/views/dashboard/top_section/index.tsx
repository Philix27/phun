import React from "react";
import styles from "./styles.module.scss";
import { useAddress } from "@thirdweb-dev/react";

export default function TopSection() {
  return (
    <section className={styles.bg1}>
      <div className={styles.inner_container}>
        <div className={styles.image}>
          <img src="./images/avatar.png" alt="hero_img" />
        </div>
        <div className={styles.text_content}>
          <h3>Welcome name</h3>
          <p>Gender</p>
          <p>Last seen</p>
        </div>
      </div>
    </section>
  );
}
