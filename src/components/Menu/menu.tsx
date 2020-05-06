import React, {useState} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => any

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

export interface IMenuContext {
  index: string,
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = React.createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = props => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect,
    defaultOpenSubMenus
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('viking-menu', className, {
    [`menu-${mode}`]: mode
  })

  const handleClick = (index: string): void => {
    setActive(index)
    onSelect!(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive!,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = (): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      const {index: defaultIndex} = childElement.props
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        if(defaultIndex) return child
        return React.cloneElement(childElement, {index: index.toString()})
      }
      console.error("Warning : Menu has a child which is not a MenuItem")
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  onSelect: () => {},
  defaultOpenSubMenus: []
}

export default Menu