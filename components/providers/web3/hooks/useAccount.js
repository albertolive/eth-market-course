import { useEffect } from "react";
import useSWR from "swr";

// Use https://emn178.github.io/online-tools/keccak_256.html
// to generate the hash of the public key. Remove the 0x to generate the hash and add it later.
const adminAddresses = {
  "0x379abc7122ae68edaa9b15b09303dba038b74f993c9c21f0d467d700b146cacb": true,
  "0xce257623ab9b29888e09fc198069c582ea9e645ff8804e4e7ae5c58a5ca35059": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account)
        throw new Error(
          "Cannot retrieve an account. Please refresh the browser."
        );

      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);

    provider?.on("accountsChanged", mutator);
    return () => provider?.removeListener("accountsChanged", mutator);
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
