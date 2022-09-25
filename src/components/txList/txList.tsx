import React, { FC } from 'react';
import { MappedDaiTransfer } from '../../utils/mapping';
import { truncateAddress } from '../../utils/string';
import './txList.css';

interface Props {
  txs: MappedDaiTransfer[];
}

const TxList: FC<Props> = ({ txs }) => {
  return (
    <ul className="txList">
      {txs.map((tx: MappedDaiTransfer) => {
        return (
          <li>
            <div className="isForSm">
              <span title={tx.from}>{tx.from}</span>
              <span title={tx.to}>{tx.to}</span>
            </div>
            <div className="isForLg">
              <span title={tx.from}>{truncateAddress(tx.from)}</span>
              <span title={tx.to}>{truncateAddress(tx.to)}</span>
            </div>
            <span>{tx.value}</span>
            <span>{new Date(tx.blockTimestamp).toLocaleDateString('en-GB')}</span>
            <a rel="noopener noreferrer" href={tx.etherscan} target="_blank">
              Etherscan
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TxList;
