import React from 'react';
import TxList from '../components/txList/txList';
import { useWeb3 } from '../contexts/web3.context';

const Dashboard = () => {
  const { web3, daiTransfers } = useWeb3();
  return (
    <>
      {console.log('provider', web3, daiTransfers)}
      <TxList txs={daiTransfers} />
    </>
  );
};

export default Dashboard;
