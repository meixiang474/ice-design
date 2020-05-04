import React, {useState} from 'react'
import classNames from 'classnames'

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

  return visible ? (
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
          关闭
        </div>
        )
      }
    </div>
  ) : null
}

Alert.defaultProps = {
  onClose: () => {},
  type: 'default',
  closable: true
}

export default Alert