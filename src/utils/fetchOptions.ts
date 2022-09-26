export const fetchBody = {
  id: 1,
  jsonrpc: '2.0',
  method: 'alchemy_getAssetTransfers',
  params: [
    {
      fromBlock: '0x0',
      toBlock: 'latest',
      category: ['erc20'],
      withMetadata: true,
      excludeZeroValue: true,
      maxCount: '0x64',
      order: 'desc',
    },
  ],
};

export const fetchOptions = (options = fetchBody) => {
  return {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify(fetchBody),
  };
};
