import React, { ChangeEvent, useEffect, useState } from 'react';
import TxList from '../components/txList/txList';
import { useWeb3 } from '../contexts/web3.context';

const Dashboard = () => {
  const { daiTransfers, filterBy } = useWeb3();
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');

  useEffect(() => {
    filterBy({ senderAddress: from, receiverAddress: to });
  }, [to, from, filterBy]);

  const senderFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const receiverFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  return (
    <>
      <input type="text" placeholder="Sender" onChange={senderFilterHandler} />
      <input type="text" placeholder="Receiver" onChange={receiverFilterHandler} />
      <TxList txs={daiTransfers} />
    </>
  );
};

export default Dashboard;
