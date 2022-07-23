const { ethers, waffle, upgrades } = require("hardhat");

describe("Extension with Signature", function() {

    it("deploy", async function() {

        const [deployer] = await ethers.getSigners();

        const provider = waffle.provider;

        var nonce = await provider.getTransactionCount(deployer.address);

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
        // upgrades contracts 
        // const proxyAddress = "0x62724E7929a2596770278A6422F80841595D4f61";
        // const proxy = await upgrades.upgradeProxy(proxyAddress, nft);

        // var tx = await extensionWithSignature.mint("x", { nonce: nonce++ });
        // await tx.wait();
        console.log(await extensionWithSignature.balanceOf(deployer.address))
    });

});