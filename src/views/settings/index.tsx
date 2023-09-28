import React from "react";
import styles from "./styles.module.scss";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { SectionTitle } from "comp/section_title";
import { formatWalletAddress } from "utils/helper";
import ProfileNavbar from "comp/navbar";

export default function SettingsView() {
  const address = useAddress();

  return (
    <div className={styles.container}>
      <ProfileNavbar />
      {SectionTitle("Settings")}
      <div className={styles.inner_container}>
        <div className={styles.section}>
          <div className={styles.first_section}>
            <p className={styles.title}>Username</p>
            <p className={styles.subtitle}>Username</p>
          </div>
          <div className={styles.value}>Value</div>
        </div>
        <div className={styles.section}>
          <div className={styles.first_section}>
            <p className={styles.title}>Wallet</p>
            <p className={styles.subtitle}>Wallet</p>
          </div>
          <div className={styles.value}>{formatWalletAddress(address!)}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.first_section}>
            <p className={styles.title}>Theme</p>
            <p className={styles.subtitle}>Theme</p>
          </div>
          <div className={styles.value}>Value</div>
        </div>
        <div className={styles.section}>
          <div className={styles.first_section}>
            <p className={styles.title}>Last seen</p>
            <p className={styles.subtitle}>Last seen</p>
          </div>
          <div className={styles.value}>Date</div>
        </div>
        <div className={styles.section}>
          <div className={styles.first_section}>
            <p className={styles.title}>Joined</p>
            <p className={styles.subtitle}>Joined</p>
          </div>
          <div className={styles.value}>Date</div>
        </div>
      </div>
    </div>
  );
}
