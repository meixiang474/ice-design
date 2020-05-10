import React, {
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
  forwardRef,
  FocusEvent
} from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

export type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**设置Input的禁用 */
  disabled?: boolean;
  /**设置Input的大小 */
  size?: InputSize;
  /**设置Input的图标 */
  icon?: IconProp;
  /**设置Input的前缀 */
  prepand?: ReactNode;
  /**设置Input的后缀 */
  append?: ReactNode;
  /**Input输入的回调函数 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**Input获取焦点的回调函数 */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /**Input失去焦点的回调函数 */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}
/**
 * ### 引用方法
 * 
 * ~~~js
 * import {Input} from 'ice-design'
 * ~~~ 
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    disabled,
    size,
    icon,
    prepand,
    append,
    style,
    ...restProps
  } = props
  const classes = classNames('viking-input', className, {
    [`input-${size}`]: size,
    'disabled': disabled
  })
  
  return (
    <div className={classes} style={style}>
      <div className="input-inner">
        {
          icon && <Icon icon={icon} size="xs" className="input-icon"/>
        }
        {
          prepand && (
            <div className="input-prepand">
              {prepand}
            </div>
          )
        }
        <input 
          ref={ref}
          {...restProps} 
          disabled={disabled}
        />
       {
         append && (
          <div className="input-append">
            {append}
          </div>
         )
       }
      </div>
    </div>
  )
})

Input.defaultProps = {
  disabled: false
}

export default Input;