import React, {useState} from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

export type AlertType = 'success' | 'danger' | 'default' | 'warning'

interface BaseAlertProps {
  className?: string;
  type?: AlertType;
  onClose?: () => any;
  title?: string;
  children?: React.ReactNode;
  closable?: boolean;
}

export type AlertProps = React.HTMLAttributes<HTMLElement> & BaseAlertProps

const Alert: React.FC<AlertProps> = (props) => {
  const {
    type,
    onClose,
    title,
    children,
    className,
    closable,
    ...restProps
  } = props

  const [visible, setVisible] = useState(true)

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  })

  const handleClick = ():void => {
    onClose!()
    setVisible(false)
  }

  return  (
    <Transition
      in={visible}
      timeout={300}
      animation="zoom-in-top"
    >    
      <div
        className={classes}
        {...restProps}
      >
        <div className="alert-content">
          {
            title && (
              <div className="alert-title">
                {title}
              </div>
            )
          }
          <div className="alert-children">
            {children}
          </div>
        </div>
        {
          closable && (
          <div className="alert-close" onClick={handleClick}>
            <Icon
              icon="times"
              style={{color: '#fff'}}
            />
          </div>
          )
        }
      </div>
    </Transition>
  ) 
}

Alert.defaultProps = {
  onClose: () => {},
  type: 'default',
  closable: true
}

export default Alert