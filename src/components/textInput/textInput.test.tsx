import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './textInput';
// import userEvent from '@testing-library/user-event';

describe('TextInput', () => {
  it('renders', () => {
    render(<TextInput label="I'm a label" placeholder="I'm a holder" id="input-id" onChange={() => {}} />);
    const label = screen.getByText("I'm a label");
    const inputField = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-id');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute('id', 'input-id');
    expect(inputField).toHaveAttribute('placeholder', "I'm a holder");
  });

  it('has a change event handler', async () => {
    // const user = userEvent.setup();
    // const changeHandlerMock = jest.fn();
    // render(<TextInput label="I'm a label" placeholder="I'm a holder" id="input-id" onChange={changeHandlerMock} />);
    // const inputField = screen.getByRole('textbox');
    // await user.type(inputField, 'Test');
    // expect(changeHandlerMock).toHaveBeenCalled();
  });
});
