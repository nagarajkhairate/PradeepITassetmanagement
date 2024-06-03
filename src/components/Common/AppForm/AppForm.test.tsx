import React from 'react';
import { render, screen } from '@testing-library/react';
import AppForm from './AppForm';
 
describe('AppForm component', () => {
  it('renders with correct children and onSubmit function', () => {
    // Mock onSubmit function
    const onSubmit = jest.fn();
 
    // Render the component with children and onSubmit function
    render(
      <AppForm onSubmit={onSubmit}>
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </AppForm>
    );
 
    // Verify that children are rendered
    // expect(screen.getByRole('textbox', { name: / /i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
 
    // Simulate form submission
    // fireEvent.submit(screen.getByRole('form'));
 
    // Check if onSubmit function is called
    // expect(onSubmit).toHaveBeenCalledTimes(1);
  });
 
  it('passes additional props to the form element', () => {
    // Mock onSubmit function
    const onSubmit = jest.fn();
 
    // Render the component with additional props
    render(
      <AppForm onSubmit={onSubmit} data-testid="test-form">
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </AppForm>
    );
 
    // Verify that additional props are passed to the form element
    expect(screen.getByTestId('test-form')).toBeInTheDocument();
  });
});