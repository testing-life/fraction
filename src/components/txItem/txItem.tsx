import React, { FC } from 'react';
import { MappedDaiTransfer } from '../../utils/mapping';
import { truncateAddress } from '../../utils/string';
import './txItem.css';

interface Props {
  tx: MappedDaiTransfer;
}

const TxItem: FC<Props> = ({ tx }) => {
  return (
    <>
      <span className="tx isForSm" title={tx.from}>
        <span>From:</span>
        {tx.from}
      </span>
      <span className="tx isForSm" title={tx.to}>
        <span>To:</span>
        {tx.to}
      </span>
      <span className="tx isForLg" title={tx.from}>
        <span>From:</span>
        {truncateAddress(tx.from)}
      </span>
      <span className="tx isForLg" title={tx.to}>
        <span>To:</span>
        {truncateAddress(tx.to)}
      </span>
      <span className="md:flex gap-3 flex-1">
        <span>Value:</span>
        {tx.value}
      </span>
      <span className="md:flex gap-3 flex-1">
        <span>When: </span>
        {new Date(tx.blockTimestamp).toLocaleDateString('en-GB')}
      </span>
      <span className="flex-1">
        <a className="btn" rel="noopener noreferrer" href={tx.etherscan} target="_blank">
          Etherscan
        </a>
      </span>
    </>
  );
};

export default TxItem;
