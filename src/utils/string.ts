export const truncateAddress = (address: string): string => {
  if (!address) {
    return '';
  }
  const regex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address?.match(regex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
