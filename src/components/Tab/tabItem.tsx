import React, {useContext} from 'react'
import {TabContext} from './tab'
import classNames from 'classnames'

export interface TabItemProps {
  index?: number,
  label: React.ReactNode,
  disabled?: boolean,
  children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = props => {
  const {
    index,
    label,
    disabled
  } = props

  const {
    currentActive,
    onSelect
  } = useContext(TabContext)

  const classes = classNames('tab-item', {
    'current': currentActive === index && !disabled,
    'disabled': disabled
  })

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    onSelect!(index!)
  }

  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  )

}

TabItem.defaultProps = {
  disabled: false
}

TabItem.displayName = 'TabItem'

export default TabItem