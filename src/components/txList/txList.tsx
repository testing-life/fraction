import React, { FC } from 'react';
import { MappedDaiTransfer } from '../../utils/mapping';
import TxItem from '../txItem/txItem';
import './txList.css';

interface Props {
  txs: MappedDaiTransfer[];
}

const TxList: FC<Props> = ({ txs }) => {
  return (
    <ul className="txList">
      {txs.map((tx: MappedDaiTransfer) => {
        return (
          <li className="txList__item">
            <TxItem tx={tx} />
          </li>
        );
      })}
    </ul>
  );
};

export default TxList;
