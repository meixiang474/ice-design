import React, {useContext, useState} from 'react'
import classNames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
import Icon from '../Icon/icon'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = props => {
  const {
    index,
    title,
    className,
    children
  } = props

  const context = useContext(MenuContext)
  const isOpened = (context.mode === 'vertical') ? context.defaultOpenSubMenus!.includes(index!) : false

  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any

  const handleMouse = (e: React.MouseEvent, toggle: boolean): void => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  } : {}

  const renderChildren = (): React.ReactNode => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {index: defaultIndex} = childElement.props
      if(childElement.type.displayName === 'MenuItem') {
        if(defaultIndex) return child
        return React.cloneElement(childElement, {index: `${index}-${i}`})
      }
      console.error("Warning : SubMenu has a child which is not a MenuItem")
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu