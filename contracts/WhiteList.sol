// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract WhiteList {

	mapping (address => uint8) internal _allowList;
	uint public numWhiteListUsers;

	constructor() { }

	function addWhiteListUser(address beneficiary, uint8 numTokens) public {

		require(msg.sender == 0xee308bfDd3Fe661C757DFa6a24a8eD245e40Ed79, "Can't change the list");
		_allowList[beneficiary] = numTokens;
		numWhiteListUsers++;
  }

	function setAllowList(address[] calldata addresses) external {

		require(msg.sender == 0xee308bfDd3Fe661C757DFa6a24a8eD245e40Ed79, "Can't change the list");
		for (uint256 i = 0; i < addresses.length; i++) {

			addWhiteListUser(addresses[i], 10);
		}
	}

	function getWhiteListNumtokens(address beneficiary) external view returns (uint) {

		return _allowList[beneficiary];
	}
}
