import './App.css';
import { ethers } from "ethers";
import Panda from './artifacts/contracts/Panda.sol/Panda.json';

const pandaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {

	 async function connectToMetaMask(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);

		await provider.send("eth_requestAccounts", []);

		const signer = provider.getSigner();
		const address = await signer.getAddress();

		const balance = await provider.getBalance(address);
		console.log(ethers.utils.formatEther(balance));
	}

	async function showContractBalance(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		const address = await signer.getAddress();
		const balance = await contract.balanceOf(address);
		console.log(ethers.BigNumber.from(balance).toNumber());
	}

	async function tokenUri(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.tokenURI(0)
			.then(uri => {

				console.log(uri);
				let data = atob(uri.split(',')[1]);
				console.log(data);
			})
			.catch(e => {

				console.log(e.data.message);
			});
	}

	async function buy(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);
		const options = {
			value: ethers.utils.parseEther("0.15"),
			gasLimit: 500000
		}

		let tx = await contract.mintTo(options);
		tx =await tx.wait();
		console.log(tx);
	}

	async function buyWhiteList(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);
		const options = {
			value: ethers.utils.parseEther("0.07"),
			gasLimit: 500000
		}

		let tx = await contract.mintWhiteListTo(options);
		tx =await tx.wait();
		console.log(tx);
	}

	async function getUser(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.getUserWhiteList(0)
			.then(user => {

				console.log(user);
			})
			.catch(e => {

				console.log(e);
			});
	}

	async function withDraw(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.withDraw('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
			.then(res => {

				console.log(res);
			})
			.catch(e => {

				console.log(e);
			});
	}

	async function getBalance(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.getBalance()
			.then(res => {

				console.log(ethers.utils.formatEther(res));
			})
			.catch(e => {

				console.log(e);
			});
	}

	async function setWhiteList(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.setAllowList([
			'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
			'0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
		])
			.then(res => {

				console.log(res);
			})
			.catch(e => {

				console.log(e);
			});
	}

	async function getNumWhiteListUsers(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.numWhiteListUsers()
			.then(res => {

				console.log(res.toNumber());
			})
			.catch(e => {

				console.log(e);
			});
	}

	async function getNumTokens(){

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(pandaAddress, Panda.abi, signer);

		contract.getWhiteListNumtokens('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
			.then(res => {

				console.log(res.toNumber());
			})
			.catch(e => {

				console.log(e);
			});
	}

  return (
    <div className="App">
			<h1>Hello world</h1>
			<button type="button" onClick={connectToMetaMask}>Connect Metamask</button>
			<button type="button" onClick={showContractBalance}>Get balance</button>
			<button type="button" onClick={buy}>Buy</button>
			<button type="button" onClick={tokenUri}>tokenUri</button>
			<button type="button" onClick={setWhiteList}>setWhiteList</button>
			<button type="button" onClick={getNumWhiteListUsers}>getNumWhiteListUsers</button>
			<button type="button" onClick={getNumTokens}>getNumTokens</button>
			<button type="button" onClick={buyWhiteList}>BuyWhiteList</button>
			{/* <button type="button" onClick={tokenUri}>TokenUri</button>
			<button type="button" onClick={getEvents}>Get events</button>
			<button type="button" onClick={getUser}>GetUser</button>
			<button type="button" onClick={withDraw}>withDraw</button>
			<button type="button" onClick={getBalance}>getBalance</button>
			<button type="button" onClick={getPayments}>getPayments</button>
			<button type="button" onClick={setPayments}>setPayment</button> */}
    </div>
  );
}

export default App;
