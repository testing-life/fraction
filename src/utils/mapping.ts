export interface MappedDaiTransfer {
  from: string;
  to: string;
  value: number;
  blockTimestamp: string;
  etherscan: string;
}

export const mapDaiData = (data: []): MappedDaiTransfer[] =>
  data.map(({ from, to, hash, value, metadata: { blockTimestamp } }): MappedDaiTransfer => {
    return { from, to, value, blockTimestamp, etherscan: `https://etherscan.io/tx/${hash}` };
  });
