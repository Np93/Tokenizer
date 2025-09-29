# Neural42 – Token BEP-20 (BNB Testnet)

## Introduction

J'ai développé un token BEP-20 nommé **Neural42 (N42)**.  
Le projet est déployé sur le **BNB Smart Chain Testnet (ChainId 97)**.  
J’ai choisi une configuration **minimale mais robuste**, basée sur des outils professionnels utilisés dans l’écosystème blockchain.

- **Nom** : Neural42  
- **Symbole** : N42  
- **Décimales** : 18  
- **Supply initiale** : 1,000,000 N42 mintés au déploiement pour le propriétaire.  
- **Adresse du contrat (Testnet)** : `0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803`

Lien vers le token [sur BscScan Testnet](https://testnet.bscscan.com/token/0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803)

<br>

## Objectifs

- Déployer un token BEP-20 standard sur le réseau BNB Testnet.  
- Fournir un **supply fixe** défini au déploiement.  
- Implémenter l’extension standard **burn** (chaque détenteur peut détruire ses tokens).  
- Interagir avec le contrat via **MetaMask** et **BscScan**.  
- Fournir un Makefile et une documentation claire pour automatiser et reproduire facilement toutes les étapes.  

<br>

## Choix techniques

| Choix                  | Justification précise                                                                                                                                       | Alternatives envisagées     | Pourquoi pas ces alternatives                                                                                                                                                          |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Blockchain : BNB Testnet** | Compatible ERC-20 (BEP-20), frais quasi nuls, faucet pour obtenir des tBNB gratuits. Permet de tester dans des conditions réelles sans coût financier. | Ethereum Mainnet            | Frais trop élevés pour un projet pédagogique, risquerait de bloquer le déploiement ou l’expérimentation.                                                                              |
| **Solidity 0.8.20**    | Version stable avec correctifs de sécurité intégrés (SafeMath natif).                                                                                       | Versions antérieures        | Moins sécurisées, certaines fonctionnalités manquantes.                                                                                                                               |
| **OpenZeppelin v5**    | Standard de facto pour des contrats sécurisés et auditables. Modules utilisés : `ERC20.sol` et `ERC20Burnable.sol`.                                         | Écrire les contrats soi-même | Risque d’erreurs de sécurité, réinventer la roue inutilement.                                                                                                                          |
| **Hardhat**            | Outil moderne (compilation, déploiement, scripts, vérification BscScan). Grande communauté et intégration facile avec ethers/TS.                            | Truffle / Foundry           | Truffle est daté, Foundry demande une stack différente (forge, tests en Solidity). Hardhat est plus accessible et largement utilisé.                                                   |
| **ethers v6**          | API moderne, meilleure gestion des BigInt, intégration Hardhat.                                                                                             | web3.js                     | API vieillissante, moins adaptée à TypeScript.                                                                                                                                         |
| **TypeScript**         | Typage fort, autocomplétion, meilleure robustesse pour scripts/tests.                                                                                       | JavaScript                  | Plus rapide à écrire mais beaucoup plus de bugs possibles à l’exécution.                                                                                                              |
| **dotenv**             | Séparation propre des secrets (`PRIVATE_KEY`, `RPC_URL`).                                                                                                   | Tout en dur dans config     | Mauvaise pratique de sécurité, rend le projet impossible à partager proprement.                                                                                                       |
| **Makefile**           | Simplifie la vie : un seul point d’entrée pour compiler, tester, déployer.                                                                                  | Lancer les commandes à la main | Risque d’oublis, moins reproductible.                                                                                                                                                  |

<br>

## Architecture des fichiers
```
project/
│
├── code/
│ └── Neural42.sol
│ 
├── deployment/ # scripts Hardhat pour déployer
│ └── 00_deploy_neural42.ts
│
├── documentation/ # README
│ ├── Whitepaper.md
│ └── README.md
│
├── hardhat.config.ts # configuration Hardhat
├── package.json # dépendances Node.js
├── tsconfig.json # config TypeScript
├── Makefile # commandes simplifiées
└── .env # variables sensibles (non versionné)
```

<br>

## Variables d'environnement

`.env` doit contenir uniquement les informations sensibles (jamais commitées sur GitHub) :

```bash
RPC_URL_BSC_TESTNET=https://data-seed-prebsc-1-s1.binance.org:8545/
PRIVATE_KEY=0xVOTRE_CLE_PRIVEE
INITIAL_SUPPLY==VotreInitialSupply
```

<br>

## Makefile
J’ai centralisé les principales commandes utiles :
- make install -> installe les dépendances.
- make compile -> compile le contrat.
- make deploy -> déploie Neural42 sur BNB Testnet.
- make clean -> supprime les fichiers générés.

<br>

## Fonctionnalités du token
- Nom : Neural42
- Symbole : N42
- Décimales : 18
- Supply fixe : 1,000,000 N42, mintés pour le propriétaire lors du déploiement.
- Burn : chaque détenteur peut détruire ses tokens (burn ou burnFrom).
- Transferts ERC-20 standards : transfer, balanceOf, approve, transferFrom.

<br>

## Étapes de fonctionnement
- Remplir .env avec RPC_URL_BSC_TESTNET et PRIVATE_KEY.
- Installer les dépendances :
```bash
make install
```
- Compiler :
```bash
make compile
```
- Déployer :
```bash
make deploy
```
Récupérer l’adresse du contrat et l’ajouter à MetaMask.

<br>

## Vérification sur BscScan
Après avoir ajouté une clé API BscScan dans .env :
- Accédez directement à BscScan et saisissez l'adresse : 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
- ou: 
```bash
npx hardhat verify --network bscTestnet 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
```
Cela rend le code source visible publiquement, gage de transparence.

<br>

## Utilisation via MetaMask
- Ouvrir MetaMask sur le réseau BNB Smart Chain Testnet.
- Cliquer sur Importer des tokens.

- Entrer :
    - Adresse : 0xf3aE7fcf4d8d0f27723Af4Cd7d01a2354a1ef803
    - Symbole : N42
    - Décimales : 18
Le solde apparaît alors dans MetaMask.

<br>

## Burn de tokens
### Via BscScan
- Onglet Write Contract → burn(uint256 amount).
- Exemple : 1000000000000000000 = 1 N42.
- Confirmer avec MetaMask.

- Résultat :
    - Le solde de l’utilisateur diminue.
    - Le totalSupply diminue également.

<br>

## Objectifs pédagogiques atteints
- Compréhension du standard ERC-20 et extension burnable.
- Déploiement d’un token BEP-20 sur BNB Testnet.
- Interaction avec MetaMask et BscScan.
- Documentation claire et complète.
- Infrastructure reproductible avec Makefile et Hardhat.

<br>