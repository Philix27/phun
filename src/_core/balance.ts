import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export type TBal =
  | {
      balance: string;
      real_balance: IWeb3RealTimeBalanceOf;
    }
  | undefined;
  
export async function get_balance(tokenType: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const superSigner = sf.createSigner({ signer: signer });
  const app_address = await superSigner.getAddress();
  const daix = await sf.loadSuperToken(tokenType);

  console.log(daix);
  try {
    if (!provider) {
      console.log("Provider not available");
      return;
    }

    const bal = await daix.balanceOf({
      account: app_address,
      providerOrSigner: superSigner,
    });

    const realBal = await daix.realtimeBalanceOf({
      account: app_address,
      timestamp: Date.now(),
      providerOrSigner: superSigner,
    });

    console.log(bal, "balance operation");
    return {
      balance: bal,
      real_balance: realBal,
    };
  } catch (error) {
    console.log("Failed");
    console.error(error);
  }
}
