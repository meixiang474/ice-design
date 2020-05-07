import React, {useState} from 'react'
import classNames from 'classnames'
import {TabItemProps} from './tabItem'

type TabMode = 'vertical' | 'horizental'
type TabStyle = 'card' | 'tab'

export interface TabProps {
  defaultIndex?: number,
  mode?: TabMode,
  onSelect?: (index: number) => any,
  className?: string
}

export interface ITabContext {
  currentActive: number,
  onSelect?: (index: number) => void
}

export const TabContext = React.createContext<ITabContext>({
  currentActive: 0
})

const Tab: React.FC<TabProps> = props => {
  const {
    defaultIndex,
    mode,
    children,
    onSelect,
    className
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('viking-tab', className, {
    [`tab-${mode}`]: mode
  })

  const handleClick = (index: number): void => {
    setActive(index)
    onSelect!(index)
  }

  const passedContext: ITabContext = {
    currentActive: currentActive!,
    onSelect: handleClick
  }

  const renderTabBody = (): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const current = childElement.props.index || index
      const grandChildren = childElement.props.children
      const bodyClasses = classNames('tab-body', {
        'current': currentActive === current && !childElement.props.disabled
      })
      return (
        <div className={bodyClasses}>
          {grandChildren}
        </div>
      )
    })
  }

  const renderTabHeader = (): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      const childrenElement = child as React.FunctionComponentElement<TabItemProps>
      if(childrenElement.type.displayName === 'TabItem'){
        if(childrenElement.props.index) return child
        return React.cloneElement(childrenElement, {index})
      }
      console.error('Warning: there is a element which is not a TabTtem in the Tab')
    })
  }

  return (
    <div className={classes}>
      <TabContext.Provider value={passedContext}>
        <ul className="tab-header">
          {renderTabHeader()}
        </ul>
        {renderTabBody()}
      </TabContext.Provider>
    </div>
    
  )
}

Tab.defaultProps = {
  defaultIndex: 0,
  mode: 'horizental',
  onSelect: (index: number): any => {} 
}

export default Tab