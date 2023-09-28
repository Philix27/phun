import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export async function createNewFlow(
  recipient: string,
  flowRate: string,
  tokenType: string
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken(tokenType);
  // const daix = await sf.loadSuperToken("CELOx");

  console.log(daix);
  try {
    if (!provider) {
      console.log("Provider not available");
      return;
    }
    const createFlowOperation = daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate,
      // userData?: string
    });
    console.log(createFlowOperation);
    console.log("Creating your stream...");
    const result = await createFlowOperation.exec(superSigner);
    console.log(result);
    console.log(`Successfully created a money stream!`);
  } catch (error) {
    console.log("Failed");
    console.error(error);
  }
}
