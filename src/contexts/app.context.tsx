import React, { FC } from 'react';
import { Web3Provider } from './web3.context';

interface Props {
  children: JSX.Element;
}

const AppProviders: FC<Props> = ({ children }) => {
  return <Web3Provider>{children}</Web3Provider>;
};

export default AppProviders;
