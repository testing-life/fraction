import React from 'react';
import { useWeb3 } from '../contexts/web3.context';

const Dashboard = () => {
  const { web3 } = useWeb3();
  return (
    <>
      {console.log('provider', web3)}
      dashboard
    </>
  );
};

export default Dashboard;
