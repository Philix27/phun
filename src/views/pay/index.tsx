import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "comp/button";
import ProfileNavbar from "comp/navbar";
import { useSigner } from "@thirdweb-dev/react";
import { formatWalletAddress } from "utils/helper";
import { useAppSelector } from "redux/hooks";
import { SettingsReduxType } from "redux/store";
import { ethers } from "ethers";
import { createNewFlow } from "./create_flow";
import { MsgDialog } from "views/beneficiary/add/add_flow";

export default function PayView() {
  const app_store = useAppSelector(SettingsReduxType);
  type Tokens = "CELOx" | "MATICx";
  const [tokenValue, setToken] = useState("CELOx");

  //! Create Flow
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState(1);
  const [flowRateDisplay, setFlowRateDisplay] = useState("");

  function calculateFlowRate(amount: number) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber!.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = Number(monthlyAmount) * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  const handleRecipientChange = (e: any) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  const handleFlowRateChange = (e: any) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay!.toString());
  };

  //! End of create flow
  const handleSubmit = () => {
    console.log(recipient, flowRate);
    if (flowRate > 0) {
      setFlowRate(1);
    }
    console.log(tokenValue);
    createNewFlow(recipient, flowRate.toString(), tokenValue);
    setTimeout(() => {
      setIsButtonLoading(false);
    }, 1000);
    //? Service class
    // const sf = new AppTokenManager();
    // sf.approve_token({
    //   amount: tokenValue.converted_token.toString(),
    //   signer: signer!,
    // });
  };
  return (
    <div className={styles.container} id="container">
      <ProfileNavbar />
      <div className={styles.inner_container}>
        <div className={styles.top}>
          <div className={styles.buttons}>
            <select
              className={styles.active}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            >
              <option value="CELOx">CELOx</option>
              <option value="MATICx">Mumbai</option>
            </select>
          </div>
          <div>
            <p>
              {`${
                flowRateDisplay !== " " ? flowRateDisplay : 0
              } ${tokenValue}/month`}
            </p>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.content}>
            {convertedFrom({
              title: "Flow rate",
              holder: "Enter a flowRate in wei/second",
              val: flowRate.toString(),
              onChange: handleFlowRateChange,
            })}
            <div className={styles.field}>
              <select onChange={handleRecipientChange}>
                {app_store.ben_list?.map((v, i) => (
                  <option key={i} value={v.address}>
                    {`${v.name}: - ${formatWalletAddress(v.address)}`}
                  </option>
                ))}
              </select>
              <p>{"address"}</p>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <Button
            text={"Send"}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
      {isButtonLoading && <MsgDialog str={"Streaming..."} />}
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
        placeholder={props.holder}
        maxLength={8}
        onChange={props.onChange}
        value={props.val}
        min={"1"}
      />
      <p>{props.title}</p>
    </div>
  );
}
