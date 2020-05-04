import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, {AlertProps} from './alert'

const customProps: AlertProps = {
  title: 'title',
  type: 'success',
  closable: false,
  className: 'klass'
}

const defaultProps: AlertProps = {
  onClose: jest.fn()
}

describe('test Alert component', () => {
  it('should render correct default alert', () => {
    const {getByText, container} = render(<Alert {...defaultProps}>Text</Alert>)
    expect(getByText('Text')).toBeInTheDocument()
    expect(container.querySelector('.alert-title')).not.toBeInTheDocument()
    expect(container.querySelector('.alert')).toHaveClass('alert alert-default')
    const close = container.querySelector('.alert-close')
    expect(close).toBeInTheDocument()
    fireEvent.click(close!)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
  it('should render correct alert based on custom props', () => {
    const {getByText, container} = render(<Alert {...customProps}>Text</Alert>)
    expect(getByText('Text')).toBeInTheDocument()
    expect(getByText('title')).toBeInTheDocument()
    expect(container.querySelector('.alert-close')).not.toBeInTheDocument()
  })
})