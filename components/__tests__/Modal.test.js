import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal.js';

test('handles confirm and cancel actions', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  render(
    <Modal isOpen title="Title" message="Msg" confirmText="Ok" cancelText="No" onConfirm={onConfirm} onCancel={onCancel} />
  );
  fireEvent.click(screen.getByText('Ok'));
  fireEvent.click(screen.getByText('No'));
  expect(onConfirm).toHaveBeenCalled();
  expect(onCancel).toHaveBeenCalled();
});
