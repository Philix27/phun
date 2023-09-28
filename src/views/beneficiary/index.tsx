import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { SectionTitle } from "comp/section_title";
import { formatWalletAddress } from "utils/helper";
import { Button } from "comp/button";
import router from "next/router";
import AddBeneficiary, { MsgDialog } from "./add/add_flow";
import ProfileNavbar from "comp/navbar";
import { SettingsReduxType } from "redux/store";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { MdDelete } from "react-icons/md";
import { SettingsActions } from "redux/slice/settings";

export default function BeneficiaryView() {
  const address = useAddress();
  const app_store = useAppSelector(SettingsReduxType);
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddBenModal, setShowAddBenModal] = useState(false);
  return (
    <div className={styles.container}>
      <ProfileNavbar />
      <div className={styles.title_section}>
        {SectionTitle("Beneficiaries")}
        {
          <Button
            text={"Add Beneficiary"}
            onClick={() => setShowAddBenModal(true)}
          />
        }
      </div>
      <div className={styles.inner_container}>
        <div className={styles.section}>
          <p className={styles.title}>Username</p>
          <div className={styles.value}>Value</div>
        </div>
        {app_store.ben_list.map((v, i) => (
          <div key={i} className={styles.section}>
            <div className={styles.value}>{v.name}</div>
            <p className={styles.title}>{v.address}</p>
            <div
              className={styles.btn}
              onClick={() => {
                dispatch(SettingsActions.delete_ben(v.id));
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              }}
            >
              <MdDelete />
            </div>
          </div>
        ))}
      </div>
      {showSuccess && <MsgDialog str={"Deleted Successfully"} />}
      {showAddBenModal && <AddBeneficiary showFlow={setShowAddBenModal} />}
    </div>
  );
}
