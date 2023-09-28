import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  useAddress,
  useNetworkMismatch,
  useChain,
  useBalance,
} from "@thirdweb-dev/react";
import { SectionTitle } from "comp/section_title";
import { formatWalletAddress } from "utils/helper";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export default function TableSection() {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const chain = useChain();
  const tokenAddress = "{{token_address}}";
  // const { data, isLoading } = useBalance(tokenAddress);
  const nativeToken = useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <div className={styles.container}>
      <div className={styles.title_section}>{SectionTitle("Dashboard")}</div>
      <div className={styles.inner_container}>
        {getRow({ title: "Address", subtitle: formatWalletAddress(address!) })}
        {getRow({
          title: "Status",
          subtitle: isMismatched ? "Disconnected" : "Connected",
        })}
        {getRow({
          title: "Active Network",
          subtitle: chain ? chain.name : "Unknown",
        })}
        {getRow({
          title: "Short name",
          subtitle: chain ? chain!.shortName.toUpperCase() : "Unknown",
        })}
        {getRow({
          title: "Testnet",
          subtitle: chain && chain.testnet ? "True" : "False",
        })}
        {getRow({
          title: "Currency Symbol",
          subtitle: chain ? chain.nativeCurrency.symbol : "Unknown",
        })}
      </div>
    </div>
  );
}

function getRow(props: { title: string; subtitle: string }) {
  return (
    <div className={styles.section}>
      <p className={styles.title}>{props.title}</p>
      <div className={styles.value}>{props.subtitle}</div>
    </div>
  );
}
