import React, {useState} from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => any

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number,
  onSelect?: SelectCallback
}

export const MenuContext = React.createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = props => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect,
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('viking-menu', className, {
    [`menu-${mode}`]: mode
  })

  const handleClick = (index: number): void => {
    setActive(index)
    onSelect!(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive!,
    onSelect: handleClick
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  onSelect: () => {}
}

export default Menu