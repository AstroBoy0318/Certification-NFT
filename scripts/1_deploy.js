const { ethers, waffle } = require("hardhat");
const swapAbi = require("../artifacts/contracts/Swap.sol/Swap.json").abi;
const IERC20 = require("../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json").abi;

async function main() {

    const [deployer] = await ethers.getSigners();

    const provider = waffle.provider;

    console.log("Deploying contracts with the account: " + deployer.address);

    var nonce = await provider.getTransactionCount(deployer.address);
    console.log(nonce);
    var startTIme = new Date().getTime();

    console.log("--------------deploy start----------------")

    var end = new Date().getTime();

    console.log("deploy ended ", (Number(end) - startTIme) / 1000);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
    })