export const buildParams = (to: string, from: string, params: {}) => {
  let filteredParams = null;
  if (to) {
    filteredParams = { ...params, toAddress: to };
  }
  if (from) {
    filteredParams = { ...params, fromAddress: from };
  }
  if (from && to) {
    filteredParams = { ...params, fromAddress: from, toAddress: to };
  }
  return filteredParams;
};
