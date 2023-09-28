import React from "react";
import styles from "./styles.module.scss";
import HeroComp from "./hero";
import SectionView from "./section";
import HomeFooter from "./footer";
import CardsView from "./cards";
import Section2View from "./section/section2";
import UseCaseView from "./use_case";
import JumbutronView from "./jumbutron";
import HomeNavbar from "./navbarr";

export default function HomeView() {
  // const {} = useweb3;
  return (
    <div className={styles.container} id="container">
      <HomeNavbar />
      {/* <NavComp /> */}
      <HeroComp />
      <JumbutronView />
      <SectionView />
      <CardsView />
      <Section2View />
      <UseCaseView />
      <HomeFooter />
    </div>
  );
}
