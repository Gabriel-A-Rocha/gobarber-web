import React from 'react';
import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
  screen,
} from '@testing-library/react';

import Input from '../../components/Input/index';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('should highligh the input on focus', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    const inputElement = getByPlaceholderText('Email');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep highlighted border when blurred but there is content inside', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    const inputElement = getByPlaceholderText('Email');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
