import React, { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { TokenAddresses } from '../consts/addresses';
import { RequestUrl } from '../consts/requestUrls';

export type Web3Context = {
  web3: any;
  daiTransfers: any;
};

interface IWeb3Provider {
  children: ReactNode;
}

interface DaiTransfers {
  result: {
    transfers: [];
  };
}

const Web3Context = createContext<Web3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = props => {
  const [web3, setWeb3] = useState<Alchemy>();
  const [daiTransfers, setDaiTransfers] = useState([]);
  const [error, setError] = useState('');

  const settings = {
    apiKey: 'demo', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  useEffect(() => {
    if (!web3) {
      setWeb3(new Alchemy(settings));
    }
  }, []);

  useEffect(() => {
    if (web3 && !daiTransfers.length) {
      const getDaiTransfers = async () => {
        const res = await fetchDaiTransfers();
        if (res) {
          setDaiTransfers(res.result.transfers);
        }
      };
      getDaiTransfers();
    }
  }, [web3]);

  const fetchDaiTransfers = async (): Promise<DaiTransfers> => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            fromBlock: '0x0',
            toBlock: 'latest',
            category: ['erc20'],
            withMetadata: true,
            excludeZeroValue: true,
            maxCount: '0x64',
            order: 'desc',
            toAddress: TokenAddresses.DaiAddress,
          },
        ],
      }),
    };
    const res = await fetch(`${RequestUrl.BaseUrlAlchemy}/demo`, options).catch((e: Error) => setError(e.message));
    let data = null;
    if (res) {
      data = await res.json();
    }
    return data;
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        daiTransfers,
      }}
      {...props}
    />
  );
};

const useWeb3 = () => useContext(Web3Context);

export { Web3Provider, useWeb3 };
