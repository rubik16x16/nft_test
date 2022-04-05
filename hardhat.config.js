/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY, RINKEBY_API_URL, MAINNET_API_URL } = process.env;
module.exports = {
	solidity: "0.8.1",
	paths: {
		artifacts: './src/artifacts',
	},
	defaultNetwork: "mainnet",
	networks: {
		hardhat: {
			chainId: 1337
		},
		ropsten: {
			url: API_URL,
			accounts: [`0x${PRIVATE_KEY}`]
		},
		rinkeby: {
			url: RINKEBY_API_URL,
			accounts: [`0x${PRIVATE_KEY}`]
		},
		mainnet: {
			url: MAINNET_API_URL,
			accounts: [`0x${PRIVATE_KEY}`]
		}
	},
};
