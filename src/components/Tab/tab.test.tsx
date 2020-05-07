import React from 'react'
import Tab, {TabProps} from './tab'
import TabItem from './tabItem'
import {fireEvent, RenderResult, render, cleanup} from '@testing-library/react'

const defaultProps: TabProps = {
  onSelect: jest.fn()
}

const verticalProps: TabProps = {
  mode: 'vertical'
}

const generateTab= (props: TabProps): JSX.Element => (
  <Tab {...props}>
    <TabItem label="1">
      1111
    </TabItem>
    <TabItem label="2">
      2222
    </TabItem>
    <TabItem label="3" disabled>
      3333
    </TabItem>
    <TabItem label={(
      <div>
        custom
      </div>
    )}>
      4444
    </TabItem>
  </Tab>
)

const createStyleFile = () => {
  const cssFileString = `
    .tab-body {
      display: none;
    }
    .tab-body.current {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFileString
  return style
}

let wrapper: RenderResult, TabElement: HTMLElement, TabItemElement: HTMLElement, DisabledElement: HTMLElement
describe('test Tab component', () => {
  beforeEach(() => {
    wrapper = render(generateTab(defaultProps))
    wrapper.container.appendChild(createStyleFile())
    TabElement = wrapper.container.querySelector('.viking-tab') as HTMLElement
    TabItemElement = wrapper.getByText('1')
    DisabledElement = wrapper.getByText('3')
  })
  it('should render correct tab based on defaultProps', () => {
    expect(TabElement).toBeInTheDocument()
    expect(TabElement).toHaveClass('tab-horizental')
    expect(TabItemElement).toHaveClass('current')
    expect(DisabledElement).toHaveClass('disabled')
    expect(wrapper.getByText('1111')).toBeVisible()
    fireEvent.click(DisabledElement)
    expect(DisabledElement).not.toHaveClass('current')
    expect(wrapper.getByText('3333')).not.toBeVisible()
    const ChangeElement = wrapper.getByText('2')
    fireEvent.click(ChangeElement)
    expect(ChangeElement).toHaveClass('current')
    expect(defaultProps.onSelect).toHaveBeenCalledWith(1)
    expect(wrapper.getByText('2222')).toBeVisible()
    expect(wrapper.getByText('1111')).not.toBeVisible()
  })
  it('should render correct vertical tab', () => {
    cleanup()
    const wrapper = render(generateTab(verticalProps))
    expect(wrapper.container.querySelector('.viking-tab')).toHaveClass('tab-vertical')
  })
  it('should render correct tab based on custom label', () => {
    expect(wrapper.getByText('custom')).toBeInTheDocument()
  })
})