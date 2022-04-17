const NETWORK_ID = process.env.NEXT_PUBLIC_TARGET_NETWORK_ID;

export const loadContract = async (contractName, web3) => {
  const res = await fetch(`/contracts/${contractName}.json`);
  const Artifact = await res.json();
  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch {
    console.log(`Contract ${contractName} cannot be loaded.`);
  }

  return contract;
};

//Using truffle package -> Very big file
// import contract from "@truffle/contract";

// export const loadContract = async (contractName, provider) => {
//   const res = await fetch(`/contracts/${contractName}.json`);
//   const Artifact = await res.json();

//   const _contract = contract(Artifact);
//   _contract.setProvider(provider);

//   let deployedContract = null;

//   try {
//     deployedContract = await _contract.deployed();
//   } catch {
//     console.log(`Contract ${contractName} cannot be loaded.`);
//   }

//   return deployedContract;
// };
