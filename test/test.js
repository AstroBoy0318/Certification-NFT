const { ethers, waffle } = require("hardhat");

describe("Extension with Signature", function() {

    it("deploy", async function() {

        const [deployer] = await ethers.getSigners();

        const provider = waffle.provider;

        var nonce = await provider.getTransactionCount(deployer.address);

        const ExtensionWithSignature = await ethers.getContractFactory("ERC721ExtensionSignature");
        extensionWithSignature = await ExtensionWithSignature.deploy("signature", "sg", 1000, { nonce: nonce++ });
        await extensionWithSignature.deployed();

        var tx = await extensionWithSignature.mint("x", { nonce: nonce++ });
        await tx.wait();
        console.log(await extensionWithSignature.balanceOf(deployer.address))
    });

});