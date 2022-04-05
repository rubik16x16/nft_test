//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { WhiteList } from "./WhiteList.sol";

contract Panda is ERC721, Ownable, WhiteList {

	using Counters for Counters.Counter;
	using Strings for uint256;
	Counters.Counter private _tokenId;

	string public baseTokenURI = "http://167.71.67.226/nft/";

	uint256 public constant TOTAL_SUPPLY = 5_511;
	uint public constant WHITE_LIST_PRICE = 0.07 ether;
	uint public constant PRICE = 0.15 ether;
	uint public numberOfTokens;

	address payable public beneficiary = payable(0x0FCa2a68af54677a1A18753786c9538B2A65eedb);

	constructor() ERC721("MAGA", "MAG") {

		_tokenId.increment();
	}

	function mintTo() external payable returns (uint256){

		uint256 newItemId = _tokenId.current();
		require(numberOfTokens < TOTAL_SUPPLY, "Purchase would exceed max tokens");
		require(msg.value >= PRICE, "Ether value sent is not correct");

		_safeMint(msg.sender, newItemId);
		_tokenId.increment();
		numberOfTokens++;
		return newItemId;
	}

	function mintWhiteListTo() external payable returns (uint256){

		uint256 newItemId = _tokenId.current();
		require(_allowList[msg.sender] >= 1, "Exceeded max available to purchase");
    require(numberOfTokens < TOTAL_SUPPLY, "Purchase would exceed max tokens");
    require(msg.value >= WHITE_LIST_PRICE, "Ether value sent is not correct");

    _allowList[msg.sender] -= 1;
		_safeMint(msg.sender, newItemId);
		_tokenId.increment();
		numberOfTokens++;
		return newItemId;
	}

	function withdraw() external onlyOwner {

		beneficiary.transfer(getBalance());
	}

	function sendFunds(address payable dest) external onlyOwner {

		dest.transfer(getBalance());
	}

	function getBalance() public view returns (uint256) {

		return address(this).balance;
	}

	function _baseURI() internal view virtual override returns (string memory) {

		return baseTokenURI;
	}

	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {

		require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

		string memory baseURI = _baseURI();
		return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), "/metadata")) : "";
	}

	function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {

		baseTokenURI = _baseTokenURI;
	}
}
