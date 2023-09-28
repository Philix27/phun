import React from "react";
import styles from "./styles.module.scss";
import { Button } from "comp/button";

export default function CardsView() {
  return (
    <section className={styles.container}>
      <div className={styles.inner_container}>
        {cardItem({
          img: "./cards/c1.png",
          title: "Tokens",
          p: "Convert your ERC20 tokens to a streamable token. It works for all ERC20 token",
        })}
        {cardItem({
          img: "./cards/c3.png",
          title: "Security",
          p: "Relies on blockchain security infrastructure. Hence, very secured for moving money accross the globe",
        })}
        {cardItem({
          img: "./cards/c2.png",
          title: "Funds",
          p: "Move funds every seconds. Leverage on this technology for a fast pace, realtime payment system",
        })}
      </div>
    </section>
  );
}
function cardItem(data: {
  img: string;
  title: string;
  p: string;
}): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={data.img} alt="hero_img" />
      </div>
      <div className={styles.text_content}>
        <h3>{data.title}</h3>
        <p>{data.p}</p>
      </div>
    </div>
  );
}
