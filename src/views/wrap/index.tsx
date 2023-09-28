import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Button } from "comp/button";
import ProfileNavbar from "comp/navbar";
import { AppTokenManager } from "_core/service";
import { useSigner } from "@thirdweb-dev/react";

export default function WrapView() {
  const signer = useSigner();
  const [isWrap, setIsWrap] = useState(true);
  const [tokenValue, setTokenValue] = useState({
    base_coin: 1,
    converted_token: 1,
  });
  const handleSubmit = () => {
    const sf = new AppTokenManager();
    sf.approve_token({
      amount: tokenValue.converted_token.toString(),
      signer: signer!,
    });
  };

  // useEffect(() => {
  //   new ethers.providers.Web3Provider(window.ethereum).getSigner();
  
    
  // }, []);
  
  return (
    <div className={styles.container} id="container">
      <ProfileNavbar />
      <div className={styles.inner_container}>
        <div className={styles.top}>
          <div className={styles.buttons}>
            <p
              onClick={() => setIsWrap(true)}
              className={isWrap ? styles.active : ""}
              
            >
              Wrap
            </p>
            <p
              onClick={() => setIsWrap(false)}
              className={!isWrap ? styles.active : ""}
            >
              Unwrap
            </p>
          </div>
          <div>
            <p>1 Diax = 1 Dia</p>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.content}>
            {convertedFrom({
              title: isWrap ? "Dia" : "Diax",
              holder: "from",
              val: tokenValue.base_coin.toString(),
              onChange: (e) => {
                let _val = Number(e.target.value);
                if (_val <= 0) _val = 1;
                setTokenValue((prev) => ({
                  ...prev,
                  base_coin: _val,
                }));
              },
            })}
            {convertedTo({
              title: !isWrap ? "Dia" : "Diax",
              holder: "to",
              val: tokenValue.base_coin.toString(),
              onChange: (e) => {
                setTokenValue((prev) => ({
                  ...prev,
                  converted_token: Number(e.target.value),
                }));
              },
            })}
          </div>
        </div>
        <div className={styles.bottom}>
          <Button
            text={"Wrap"}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function convertedFrom(props: {
  holder?: string;
  title: string;
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.field}>
      <input
        type="number"
        placeholder={"amount"}
        maxLength={8}
        onChange={props.onChange}
        value={props.val}
        min={"1"}
      />
      <p>{props.title}</p>
    </div>
  );
}

function convertedTo(props: {
  holder?: string;
  title: string;
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.field}>
      <input
        type="number"
        placeholder={"amount"}
        disabled
        maxLength={8}
        onChange={props.onChange}
        value={props.val}
      />
      <p>{props.title}</p>
    </div>
  );
}
