import { truncateAddress } from './string';

describe('truncateAddress', () => {
  it('should truncate address', () => {
    const input = '0x69d9a2e05ee008882e2d42179c20bd6f06f39996';
    const expectedResult = '0x69d9…9996';
    const result = truncateAddress(input);
    expect(result).toEqual(expectedResult);
  });

  it('should return empty string when missing address', () => {
    const input = '';
    const expectedResult = '';
    const result = truncateAddress(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return input when regex doesn't match", () => {
    const input = 'I/m a random string';
    const expectedResult = 'I/m a random string';
    const result = truncateAddress(input);
    expect(result).toEqual(expectedResult);
  });
});
