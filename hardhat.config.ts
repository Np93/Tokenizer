// Charge les variables d'environnement depuis un fichier .env à la racine du projet.
import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Configuration principale de Hardhat
const config: HardhatUserConfig = {
  // Bloc solidity : version du compilateur et paramètres d’optimisation
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
  // Définition des réseaux sur lesquels Hardhat peut se connecter/déployer
  networks: {
    // Réseau de test Binance Smart Chain (BSC Testnet)
    bscTestnet: {
      url: process.env.RPC_URL_BSC_TESTNET || "",
      // ID de chaîne de BSC Testnet (97). Utile pour les wallets
      chainId: 97,
      // Comptes utilisés pour signer les transactions.
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};

export default config;
