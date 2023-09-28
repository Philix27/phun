import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";
import WorkflowTextInput from "./text-input";
import { Button } from "comp/button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { SettingsReduxType } from "redux/store";
import { SettingsActions } from "redux/slice/settings";
import { setTimeout } from "timers";

interface IProps {
  showFlow: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddBeneficiary(props: IProps) {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formVal, setformVal] = useState({
    name: "",
    address: "",
  });
  return (
    <div className={styles.addFlowContainer}>
      <div className={styles.second_wrapper}>
        <div
          className={styles.inner_blank}
          onClick={() => {
            props.showFlow(false);
          }}
        ></div>
        <div className={styles.inner_container}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <h2>Add Beneficiary</h2>

              <IoClose
                onClick={() => {
                  props.showFlow(false);
                }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.title_block}>
                <div className={styles.group}>
                  <p>Name</p>
                  <WorkflowTextInput
                    placeholder="Name of employee"
                    widthByPercent={"100%"}
                    value={formVal.name}
                    handleChange={(e) => {
                      setformVal({ ...formVal, name: e.target.value });
                    }}
                  />
                </div>
                <div className={styles.group}>
                  <p>Address</p>
                  <WorkflowTextInput
                    placeholder="Wallet address of employee"
                    widthByPercent={"100%"}
                    value={formVal.address}
                    handleChange={(e) => {
                      setformVal({ ...formVal, address: e.target.value });
                    }}
                  />
                </div>
              </div>
              {
                <Button
                  text={"Save"}
                  onClick={() => {
                    if (formVal.address && formVal.name) {
                      console.log("inner btn ben");
                      dispatch(
                        SettingsActions.add_ben({
                          name: formVal.name,
                          address: formVal.address,
                          id: Date.now().toString(),
                        })
                      );
                      setShowSuccess(true);
                      setTimeout(() => setShowSuccess(false), 3000);
                    }
                  }}
                />
              }
              {showSuccess && <MsgDialog str={"Added Successfully"} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MsgDialog(props: { str: string }) {
  return <p className={styles.msg}>{props.str}</p>;
}

// str={"Added Successfully"}
