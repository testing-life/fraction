import React, { useEffect, useState } from 'react';
import TxList from '../components/txList/txList';
import { useWeb3 } from '../contexts/web3.context';

const Dashboard = () => {
  const { daiTransfers, filterBy } = useWeb3();
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');

  useEffect(() => {
    if (to) {
      filterBy({ receiverAddress: to });
    }
    if (from) {
      filterBy({ senderAddress: from });
    }
    if (to && from) {
      filterBy({ senderAddress: from, receiverAddress: to });
    }
  }, [to, from]);

  const senderFilterHandler = (e: any) => {
    setFrom(e.target.value);
  };

  const receiverFilterHandler = (e: any) => {
    setTo(e.target.value);
  };

  return (
    <>
      <input type="text" placeholder="Sender" onInput={senderFilterHandler} />
      <input type="text" placeholder="Receiver" onInput={receiverFilterHandler} />
      <TxList txs={daiTransfers} />
    </>
  );
};

export default Dashboard;
