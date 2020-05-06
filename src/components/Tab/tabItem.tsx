import React, {useContext} from 'react'
import {TabContext} from './tab'
import classNames from 'classnames'

export interface TabItemProps {
  index?: number,
  label: string,
  children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = props => {
  const {
    index,
    label,
  } = props

  const {
    currentActive,
    onSelect
  } = useContext(TabContext)

  const classes = classNames('tab-item', {
    'current': currentActive === index
  })

  const handleClick = (): void => {
    onSelect!(index!)
  }

  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  )

}

TabItem.displayName = 'TabItem'

export default TabItem