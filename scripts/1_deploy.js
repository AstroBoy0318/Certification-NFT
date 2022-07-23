const { ethers, waffle, upgrades } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();

    const provider = waffle.provider;

    console.log("Deploying contracts with the account: " + deployer.address);

    var nonce = await provider.getTransactionCount(deployer.address);
    console.log(nonce);
    var startTIme = new Date().getTime();

    console.log("--------------deploy start----------------")

    const nft = await ethers.getContractFactory("NFT");
    // deploy contracts
    const proxy = await upgrades.deployProxy(
        nft, [
            "Cert NFT", // name
            "CRT", // symbol
            100, //capped supply
            deployer.address // beneficiary
        ], { nonce: nonce++ }
    );
    await proxy.deployed();
    console.log("NFT: ", proxy.address);

    var end = new Date().getTime();

    console.log("deploy ended ", (Number(end) - startTIme) / 1000);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
    })