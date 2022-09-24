import React, { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Web3Context = {
  provider: any;
};

interface IWeb3Provider {
  children: ReactNode;
}

const Web3Context = createContext<Web3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = props => {
  const [provider, setProvider] = useState('');

  useEffect(() => {
    setProvider('oioi');
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
      }}
      {...props}
    />
  );
};

const useWeb3 = () => useContext(Web3Context);
export { Web3Provider, useWeb3 };
