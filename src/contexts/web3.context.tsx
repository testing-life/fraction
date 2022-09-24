import React, { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';

export type Web3Context = {
  web3: any;
};

interface IWeb3Provider {
  children: ReactNode;
}

const Web3Context = createContext<Web3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = props => {
  const [web3, setWeb3] = useState<Alchemy>();

  const settings = {
    apiKey: 'demo', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  useEffect(() => {
    if (!web3) {
      setWeb3(new Alchemy(settings));
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
      }}
      {...props}
    />
  );
};

const useWeb3 = () => useContext(Web3Context);
export { Web3Provider, useWeb3 };
