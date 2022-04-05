// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WhiteList is Ownable {

	mapping (address => uint8) internal _allowList;
	uint public numWhiteListUsers;

	constructor() { }

	function addWhiteListUser(address beneficiary, uint8 numTokens) public onlyOwner {

		_allowList[beneficiary] = numTokens;
		numWhiteListUsers++;
  }

	function setAllowList(address[] calldata addresses) external onlyOwner {

		for (uint256 i = 0; i < addresses.length; i++) {

			addWhiteListUser(addresses[i], 10);
		}
	}

	function getWhiteListNumtokens(address beneficiary) external view returns (uint) {

		return _allowList[beneficiary];
	}
}
