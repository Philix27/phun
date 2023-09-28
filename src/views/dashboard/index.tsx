import React from "react";
import styles from "./styles.module.scss";
import TopSection from "./top_section";
import SecondSection from "./section";
import TableSection from "./section";
import TokenSection from "./section/token";
import ProfileNavbar from "comp/navbar";

export default function DashboardView() {
  return (
    <div className={styles.container}>
      <ProfileNavbar />
      <TopSection />
      <TableSection />
      <TokenSection />
    </div>
  );
}

// npm create sanity@latest -
// - --template get - started--project 6yy2i02c--dataset production--provider google
