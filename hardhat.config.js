require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        ganache: {
            url: "http://127.0.0.1:7545"
        },
        fantomtestnet: {
            url: "https://rpc.testnet.fantom.network",
            accounts: [process.env.PRIVATEKEY]
        },
        ethereum: {
            url: "https://main-light.eth.linkpool.io/",
            accounts: [process.env.PRIVATEKEY]
        },
        ICICB: {
            url: "https://mainnet-rpc.icicbchain.org",
            accounts: [process.env.PRIVATEKEY]
        },
        ICICBtest: {
            url: "https://testnet-rpc.icicbchain.org",
            accounts: [process.env.PRIVATEKEY]
        },
        bsc: {
            url: "https://bsc-dataseed1.ninicoin.io/",
            accounts: [process.env.PRIVATEKEY]
        },
        bsctest: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            accounts: [process.env.PRIVATEKEY],
        },
        matic: {
            url: "https://rpc-mainnet.matic.quiknode.pro",
            accounts: [process.env.PRIVATEKEY]
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            accounts: [process.env.PRIVATEKEY]
        },
        fantom: {
            url: "https://speedy-nodes-nyc.moralis.io/89b4f5c6d2fc13792dcaf416/fantom/mainnet",
            accounts: [process.env.PRIVATEKEY]
        },
        velastest: {
            url: "https://testnet.velas.com/rpc/",
            accounts: [process.env.PRIVATEKEY]
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "ECUS9XGPERAY4D5XMM9KE1QZKISJDQESAX"
    },
    solidity: {
        compilers: [{
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            }, {
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            }, {
                version: "0.8.3",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            }, {
                version: "0.7.5",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100,
                    },
                }
            },
            {
                version: "0.6.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
        ]
    },
    mocha: {
        timeout: 600000
    }
};