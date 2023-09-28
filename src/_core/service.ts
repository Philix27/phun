import { Framework, IConfig, SuperToken } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { daiABI } from "./config";
import { Celo, Mumbai, Polygon } from "@thirdweb-dev/chains";
import { Address } from "./address";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
export class AppTokenManager {
  // provider = new ethers.providers.InfuraProvider(
  //   "https://celo-mainnet.infura.io/v3/c2e88be57a604a04bc8b7fbc24a4bb93"
  // );

  cs = ThirdwebProvider({ activeChain: Celo.chain });
  provider = new ethers.providers.InfuraProvider(
    "celo",
    "923643a14d677804ef20b1c0f799890b"
  );
  // .InfuraProvider("matic", Mumbai.chainId);

  sf: Promise<Framework> | any;
  usdcx: SuperToken | undefined;

  // signer: ethers.Signer = Celo;

  constructor() {
    this.init();
  }

  private async init() {
    const config: IConfig = {
      hostAddress: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
      cfaV1Address: "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
      idaV1Address: "0x804348D4960a61f2d5F9ce9103027A3E849E09b8",
      resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3", //fake
      governanceAddress: "0x0d56ED56b63382B0FC964490feB9AE438B6B4b79", //! fake
      cfaV1ForwarderAddress: "0xcfA132E353cB4E398080B9700609bb008eceB125",
    };
    const provider = await detectEthereumProvider();
    // const web3 = new Web3(provider);
    this.sf = await SuperToken.create({
      address: Address.celo.CELOx,
      // address: "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2",
      config,
      networkName: Mumbai.name,
      // you can also pass in chainId instead (e.g. chainId: 137)
      // provider: ThirdwebProvider,
      provider: this.provider,
      chainId: Mumbai.chainId,
    });

    //  const provider = await detectEthereumProvider();
    //     const web3 = new Web3(provider);

    //     if (provider) {
    //         const sf = new SuperfluidSDK.Framework({
    //             web3: new Web3(provider)
    //         });

    //         await sf.initialize();

    //     const fUSDC = new web3.eth.Contract(ERC20abi, fUSDC_address);
    //     const fUSDCx = new web3.eth.Contract(fUSDCxabi, fUSDCx_address);

    // this.sf.create;
    // this.sf = await Framework.create({
    //   chainId: Mumbai.chainId,
    //   provider: ThirdwebProvider,
    //   resolverAddress: "",
    // });
    // .then((res) => {
    //   console.log(res, "successful");
    // })
    // .catch((e) => {
    //   console.log(e, "ops, failed init");
    // });

    this.usdcx = this.sf.loadSuperToken(Address.mumbai.fDAIx);
  }

  async downgrade_token() {}

  async approve_token(props: { amount: string; signer: ethers.Signer }) {
    console.log("approve_token");
    try {
      this.usdcx
        ?.approve({
          receiver: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
          amount: props.amount,
        })
        .exec(props.signer);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  async upgrade_token(props: { amount: string; signer: ethers.Signer }) {
    try {
      // this.usdcx.upgrade();
    } catch (error) {
      console.log("Error ", error);
    }
  }

  async create_flow(props: {
    sender: string;
    receiver: string;
    flowRate: string;
    signer: ethers.Signer;
  }) {
    try {
      this.usdcx
        ?.createFlow({
          sender: props.sender,
          receiver: "0xXyZ...",
          flowRate: "100000",
        })
        .exec(props.signer);
    } catch (error) {
      console.log("Error ", error);
    }
  }
}

// infura

// curl --url https://mainnet.infura.io/v3/c2e88be57a604a04bc8b7fbc24a4bb93 \
// -X POST \
// -H "Content-Type: application/json" \
// -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
