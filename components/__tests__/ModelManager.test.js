import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModelManager from '../ModelManager.js';

const locale = { model: 'model', noModels: 'no models' };

test('renders model options and notifies selection', () => {
  const handle = jest.fn();
  const models = ['a', 'b'];
  render(<ModelManager locale={locale} models={models} selected="a" onSelect={handle} />);
  fireEvent.change(screen.getByLabelText('model'), { target: { value: 'b' } });
  expect(handle).toHaveBeenCalledWith('b');
});
