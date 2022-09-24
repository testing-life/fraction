import React from 'react';
import { useWeb3 } from '../contexts/web3.context';

const Dashboard = () => {
  const { provider } = useWeb3();
  return (
    <>
      {console.log('provider', provider)}
      dashboard
    </>
  );
};

export default Dashboard;
