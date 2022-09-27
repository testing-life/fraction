import { render, screen, within } from '@testing-library/react';
import TxItem from './txItem';

const testData = {
  from: '0x69d9a2e05ee008882e2d42179c20bd6f06f39996',
  to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
  value: 99,
  blockTimestamp: '2022-09-27T08:48:11.000Z',
  etherscan: 'https://etherscan.io/tx/0x933aac070f758b099539ba45a6949268e3eeed3e0980d61eca7149391a7d952f',
};

describe('TxItem', () => {
  it('renders', () => {
    render(<TxItem tx={testData} />);
    const from = screen.getByText(testData.from);
    const to = screen.getByText(testData.to);
    const value = screen.getByText(testData.value);
    const time = screen.getByText('27/09/2022');
    const link = screen.getByText('Etherscan');

    expect(from).toBeInTheDocument();
    expect(to).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testData.etherscan);
  });
});
