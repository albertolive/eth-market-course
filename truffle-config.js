const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC,
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0,
        }),
      network_id: "3",
      gas: 5500000, // Gas limit, How much gas we are willing to spent
      gasPrice: 20000000000, // Gas price, How much we are willing to pay for unit of gas
      confirmations: 2, // number of blocks to wait between deployments. (default: 0)
      timeoutBlocks: 200, // number of blocks before a deployment times out (minimum/default: 50)
    },
  },
  compilers: {
    solc: {
      version: "0.8.12", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
