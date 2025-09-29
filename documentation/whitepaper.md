# Neural42 – Whitepaper

*(BEP-20 Token déployé sur BNB Smart Chain Testnet)*

---

## Résumé exécutif

Neural42 (N42) est un token ERC-20 burnable développé dans le cadre d’un projet pédagogique à l’école 42.
Le projet consiste à **créer, déployer et documenter** un token BEP-20 fonctionnel sur une blockchain publique (BNB Testnet), en utilisant des outils modernes de développement et de déploiement de smart contracts.

L’objectif est double :

Comprendre les standards ERC-20/BEP-20 et leur implémentation en Solidity.

Savoir reproduire un cycle complet de développement blockchain : du code source au déploiement vérifié sur testnet, avec intégration à des outils comme MetaMask et BscScan.

---

## Vision et objectifs
- La philosophie de Neural42 est la pédagogie par la pratique :
- un contrat minimaliste, mais robuste et conforme aux standards,
- un environnement de développement professionnel (Hardhat, TypeScript, ethers),
- un déploiement reproductible sur une blockchain publique,
- une documentation complète expliquant chaque choix technique.

Neural42 n’a pas vocation à devenir un actif financier, mais à servir de référence pédagogique pour apprendre :
- comment fonctionne un token ERC-20,
- comment il est déployé sur une blockchain,
- comment interagir avec lui via un portefeuille (MetaMask) ou un explorateur (BscScan).

---

## Choix techniques et justification
### Blockchain : BNB Smart Chain (BSC) Testnet

**Pourquoi pas Ethereum directement ?**
- Les frais de gas sur Ethereum Mainnet sont élevés, ce qui le rend peu adapté à un projet pédagogique.

**Pourquoi BNB Testnet ?**
- Compatible avec le standard **ERC-20 (BEP-20)**.
- Frais de transaction très faibles (en tBNB gratuit via faucet).
- Explorateur BscScan Testnet offrant les mêmes outils que l’Ethereum mainnet.

**Avantage pédagogique** : permet de tester dans des conditions réalistes (vrai réseau, vraies transactions), mais sans coût financier réel.

---

### Langage : Solidity
- Standard de facto pour le développement de smart contracts.
- Version choisie : ^0.8.20
    - intègre nativement **SafeMath** (plus besoin de bibliothèques externes pour éviter les overflows/      underflows).
    - supporte les dernières fonctionnalités optimisées de la VM Ethereum (EVM).

---

### Bibliothèque : OpenZeppelin Contracts
- Fournit des implémentations auditées et sécurisées des standards ERC-20.
- Permet d’éviter les erreurs courantes liées à une réimplémentation manuelle.
- Modules utilisés :
    - ERC20.sol : base du standard ERC-20.
    - ERC20Burnable.sol : permet à l’utilisateur de burn ses propres tokens.

### Environnement de développement : Hardhat
- Outil moderne de développement pour Ethereum/BSC.
- Permet de :
    - compiler le contrat,
    - déployer sur n’importe quel réseau,
    - exécuter des scripts d’interaction,
    - vérifier le contrat sur BscScan.

- **Pourquoi Hardhat plutôt que Truffle ?**
    - plus rapide,
    - meilleure intégration avec TypeScript et ethers,
    - support actif et communauté plus large.

---

### Librairie d’interaction : ethers.js v6
- Permet d’interagir avec Ethereum/BSC (transactions, lectures de contrat).
- Utilisé dans les scripts Hardhat.
- Meilleure gestion des BigInt que web3.js.

---

### Scripting : TypeScript + dotenv
- TypeScript : apporte un typage fort, réduit les erreurs de runtime.
- dotenv : stocke les variables sensibles (PRIVATE_KEY, RPC_URL) dans un fichier .env non versionné.

---

### Orchestration : Makefile
- Simplifie les commandes longues en raccourcis :
    - make install -> installation des dépendances
    - make compile -> compilation du contrat
    - make deploy -> déploiement sur BSC Testnet

---

### Portefeuille : MetaMask
- Permet d’interagir facilement avec le token depuis une interface utilisateur.
- Possibilité d’importer le contrat en tant que custom token (N42).
- Support natif de BSC Testnet via ajout manuel du RPC.
- Explorateur : BscScan Testnet
- Permet de vérifier le contrat après déploiement.
- Donne accès à une interface pour lire/écrire sur le contrat directement depuis un navigateur.
- Outil indispensable pour montrer la transparence d’un projet blockchain.

---


## Contrat Neural42
```bash
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Neural42 is ERC20, ERC20Burnable {
    constructor() ERC20("Neural42", "N42") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
```

### Fonctionnalités
- Supply fixe : 1,000,000 tokens N42 émis lors du déploiement, attribués au déployeur.
- Burn : n’importe quel utilisateur peut réduire son solde (et l’offre totale).
- Transferts ERC-20 standards : transfer, balanceOf, approve, transferFrom, etc.

---

## Installation et configuration
### Prérequis
- Node.js v18+
- npm
- MetaMask installé dans le navigateur

#### Étapes
```bash
git clone <repo>
cd Neural42
npm install
```

Créer un fichier .env :

```bash
RPC_URL_BSC_TESTNET=https://data-seed-prebsc-1-s1.binance.org:8545/
PRIVATE_KEY=0xVotreClePrivee
INITIAL_SUPPLY==VotreInitialSupply
```
---

## Déploiement
### Compiler
```bash
npx hardhat compile
```

### Déployer
```bash
npx hardhat run deployment/00_deploy_neural42.ts --network bscTestnet
```

Résultat attendu :
```bash
Deployer: 0x44c3124009026bdc77F4bA3a31603a13026F589c
Balance (tBNB): 0.2
Neural42 déployé à: 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
Total supply: 1000000000000000000000000
```

---

## Vérification sur BscScan Testnet
```bash
npx hardhat verify --network bscTestnet 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
```

Ensuite :
- aller sur BscScan Testnet
- rechercher l’adresse du contrat
- accéder aux onglets Read Contract et Write Contract

---

## Utilisation via MetaMask
- Ouvrir MetaMask → Réseau : BNB Smart Chain Testnet
- Cliquer sur Importer des tokens
- Renseigner :
    - Adresse : 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
    - Symbole : N42
    - Décimales : 18
Le solde apparaît alors dans l’interface MetaMask.

---

## Burn de tokens
### Sur BscScan
- Onglet Write Contract → burn(uint256 amount)
- Entrer une valeur en wei (ex. 1 N42 = 1000000000000000000)
- Confirmer avec MetaMask

### Résultat
- Le solde de l’utilisateur diminue.
- L’offre totale (totalSupply()) diminue également.

---

### Objectifs pédagogiques atteints
- Compréhension du standard ERC-20.
- Déploiement d’un token BEP-20 sur un réseau public.
- Interaction avec MetaMask et BscScan.
- Documentation claire et justifiée de toutes les étapes.
- Utilisation d’outils modernes et professionnels (Hardhat, TypeScript, OpenZeppelin).

---

### Conclusion
Neural42 est un projet simple mais complet, qui illustre :
- la création d’un smart contract sécurisé,
- le déploiement sur une blockchain réelle (BNB Testnet),
- l’utilisation avec des outils concrets (MetaMask, BscScan).

C’est une base solide pour quiconque souhaite apprendre le développement blockchain et les bonnes pratiques du monde Ethereum/BSC.