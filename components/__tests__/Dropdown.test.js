import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown.js';

test('renders options and triggers onChange', () => {
  const handle = jest.fn();
  const opts = [{ label: 'React', value: 'react' }, { label: 'Svelte', value: 'svelte' }];
  render(<Dropdown label="Framework" options={opts} value="react" onChange={handle} />);
  const select = screen.getByLabelText('Framework');
  expect(select.options).toHaveLength(2);
  fireEvent.change(select, { target: { value: 'svelte' } });
  expect(handle).toHaveBeenCalledWith('svelte');
});
