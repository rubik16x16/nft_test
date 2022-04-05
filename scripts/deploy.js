
//0x36906bdf73Cb205eA4eD21E37a16273ACbf0C942
const hre = require("hardhat");

async function main() {

  const Panda = await hre.ethers.getContractFactory("Panda")
  const panda = await Panda.deploy()
  await panda.deployed()
  console.log("Contract deployed to address:", panda.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// const beneficiary = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';

// async function main() {

// 	const Test = await hre.ethers.getContractFactory("Test");
// 	const test = await Test.deploy(beneficiary);

// 	await test.deployed();

// 	console.log("Test deployed to:", test.address);
// }

// main()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 		console.error(error)
// 		process.exit(1)
// 	})
