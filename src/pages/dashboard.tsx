import React, { ChangeEvent, useEffect, useState } from 'react';
import TextInput from '../components/textInput/textInput';
import TxList from '../components/txList/txList';
import { useWeb3 } from '../contexts/web3.context';
import './dashboard.css';

const Dashboard = () => {
  const { daiTransfers, filterBy } = useWeb3();
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');

  useEffect(() => {
    filterBy({ senderAddress: from, receiverAddress: to });
  }, [to, from]);

  const senderFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const receiverFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  return (
    <>
      <div className="inputWrapper">
        <TextInput id="sender-filter" label="Filter by" placeholder="Sender" onChange={senderFilterHandler} />
        <TextInput id="receiver-filter" label="Filter by" placeholder="Receiver" onChange={receiverFilterHandler} />
      </div>
      <TxList txs={daiTransfers} />
    </>
  );
};

export default Dashboard;
