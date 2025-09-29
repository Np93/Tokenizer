// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Neural42 is ERC20, ERC20Burnable {
    constructor() ERC20("Neural42", "N42") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}