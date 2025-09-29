import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20", // cohérent avec ton pragma
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  // IMPORTANT: on pointe vers ./code (pas ./contracts)
  paths: {
    sources: "./code",
    // tests: "./test",
    // scripts: "./deployment",
    // cache: "./cache",
    // artifacts: "./artifacts"
  },
  networks: {
    bscTestnet: {
      url: process.env.RPC_URL_BSC_TESTNET || "",
      chainId: 97,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};

export default config;