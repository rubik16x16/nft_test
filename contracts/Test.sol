// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Test {

	address payable public beneficiary;

	constructor(address payable beneficiaryAddress) {

		beneficiary = beneficiaryAddress;
	}

	function getBalance() public view returns (uint256) {

		return address(this).balance;
	}

	function deposit(uint256 amount) payable public {

		require(msg.value == amount);
		// nothing else to do!
	}
}
