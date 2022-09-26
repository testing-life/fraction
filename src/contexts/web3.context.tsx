import React, { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { TokenAddresses } from '../consts/addresses';
import { RequestUrl } from '../consts/requestUrls';
import { mapDaiData, MappedDaiTransfer } from '../utils/mapping';

export type Web3Context = {
  web3: any;
  daiTransfers: any;
  error: string;
  filterBy: ({ senderAddress, receiverAddress }: { senderAddress?: string; receiverAddress?: string }) => void;
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
  const [daiTransfers, setDaiTransfers] = useState<MappedDaiTransfer[]>([]);
  const [error, setError] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterFrom, setFilterFrom] = useState('');

  const settings = {
    apiKey: 'demo', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const fetchBody = {
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
      },
    ],
  };

  const fetchOptions = (options = fetchBody) => {
    return {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify(options),
    };
  };

  useEffect(() => {
    if (!web3) {
      setWeb3(new Alchemy(settings));
    }
  }, []);

  useEffect(() => {
    if (web3 && !daiTransfers.length) {
      const getDaiTransfers = async () => {
        const res = await fetchDaiTransfers(fetchOptions());
        if (res) {
          const mappedResult = mapDaiData(res.result.transfers);
          setDaiTransfers(mappedResult);
        }
      };
      getDaiTransfers();
      web3.ws.on('block', () => {
        getDaiTransfers();
      });
    }
    return () => {
      web3?.ws.removeAllListeners();
    };
  }, [web3]);

  useEffect(() => {
    web3?.ws.removeAllListeners();
    if (filterTo) {
      const filteredParams = { ...fetchBody.params[0], toAddress: filterTo };
      const filteredBody = { ...fetchBody, params: [filteredParams] };
      console.log('fetchOptions() to', fetchOptions(filteredBody));
      fetchDaiTransfers(fetchOptions(filteredBody));
    }
    if (filterFrom) {
      const filteredParams = { ...fetchBody.params[0], fromAddress: filterFrom };
      const filteredBody = { ...fetchBody, params: [filteredParams] };
      console.log('fetchOptions() from', fetchOptions(filteredBody));
      fetchDaiTransfers(fetchOptions(filteredBody));
    }
    if (filterFrom && filterTo) {
      const filteredParams = { ...fetchBody.params[0], fromAddress: filterFrom, toAddress: filterTo };
      const filteredBody = { ...fetchBody, params: [filteredParams] };
      console.log('fetchOptions() from', fetchOptions(filteredBody));
      fetchDaiTransfers(fetchOptions(filteredBody));
    }
  }, [filterTo, filterFrom]);

  const fetchDaiTransfers = async (options = fetchOptions()): Promise<DaiTransfers> => {
    const res = await fetch(`${RequestUrl.BaseUrlAlchemy}/demo`, options).catch((e: Error) => setError(e.message));
    let data = null;
    if (res) {
      data = await res.json();
    }
    return data;
  };

  const filterBy = ({ senderAddress = '', receiverAddress = '' } = {}) => {
    if (senderAddress) {
      setFilterFrom(senderAddress);
    }

    if (receiverAddress) {
      setFilterTo(receiverAddress);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        daiTransfers,
        error,
        filterBy,
      }}
      {...props}
    />
  );
};

const useWeb3 = () => useContext(Web3Context);

export { Web3Provider, useWeb3 };
