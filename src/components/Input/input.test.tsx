import React from 'react'
import {
  render, 
  fireEvent, 
  RenderResult,
  cleanup
} from '@testing-library/react'
import Input, {InputProps} from './input'

const defaultProps: InputProps = {
  onFocus: jest.fn(),
  onChange: jest.fn(),
  onBlur: jest.fn()
}

const disabledProps: InputProps = {
  disabled: true
}

const sizeProps: InputProps = {
  size: 'lg'
}

const iconProps: InputProps = {
  icon: 'search'
}

const generateInput = (props: InputProps): React.ReactElement => (
    <Input {...props}/>
)

let wrapper: RenderResult
describe('test Input component', () => {
  beforeEach(() => {
    wrapper = render(generateInput(defaultProps))
  })
  it('should render Input correct based on defaultProps', () => {
    expect(wrapper.container.querySelector('.viking-input')).toBeInTheDocument()
    const inputElement: HTMLInputElement = wrapper.container.querySelector('input') as HTMLInputElement
    fireEvent.focus(inputElement)
    expect(defaultProps.onFocus).toHaveBeenCalled()
    fireEvent.blur(inputElement)
    expect(defaultProps.onBlur).toHaveBeenCalled()
    fireEvent.change(inputElement, {target: {value: '1'}})
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(inputElement.value).toEqual('1')
  })
  it('should render the correct Input based on disabledProps', () => {
    cleanup()
    const wrapper: RenderResult = render(generateInput(disabledProps))
    expect(wrapper.container.querySelector('.viking-input')).toHaveClass('disabled')
    expect(wrapper.container.querySelector('input')?.disabled).toBeTruthy()
  })
  it('should render the correct Input based on sizeProps', () => {
    cleanup()
    const wrapper: RenderResult = render(generateInput(sizeProps))
    expect(wrapper.container.querySelector('.viking-input')).toHaveClass('input-lg')
  })
  it('should render correct Input based on IconProps', () => {
    cleanup()
    const wrapper: RenderResult = render(generateInput(iconProps))
    expect(wrapper.container.querySelector('.input-icon')).toBeInTheDocument() 
  })
})