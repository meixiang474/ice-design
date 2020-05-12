import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  ReactNode,
  KeyboardEvent,
  useRef
} from 'react'
import classNames from 'classnames'
import Input, {InputProps} from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const {
    fetchSuggestions,
    onSelect,
    onChange,
    value = '',
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highLightIndex, setHightLightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  const debounceValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if(debounceValue && triggerSearch.current){
      const results = fetchSuggestions(debounceValue)
      if(results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      }else {
        const resultsWithData = results as DataSourceType[]
        setSuggestions(resultsWithData)
      }
    } else {
      setSuggestions([])
    }
    setHightLightIndex(-1)
  }, [debounceValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange && onChange(e)
    setInputValue(e.target.value)
    triggerSearch.current = true
  }

  const highlight = (index: number) => {
    if(index < 0) index = 0
    if(index >= suggestions.length ){
      index = suggestions.length - 1
    }
    setHightLightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch(e.keyCode){
      case 13:
        if(suggestions[highLightIndex]){
          handleSelect(suggestions[highLightIndex])
        }
        break
      case 38:
        highlight(highLightIndex - 1)
        break
      case 40:
        highlight(highLightIndex + 1)
        break
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleSelect = (item: DataSourceType): void => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item)
    triggerSearch.current = false
  }

  const renderTemplate = (item : DataSourceType): ReactNode => {
    return renderOption ? renderOption(item) : item
  }

  const generateDropDown = (): ReactElement => (
    <ul>
      {suggestions.map((item, index) => {
        const cnames = classNames('suggestions-item', {
          'item-highlighted': index === highLightIndex
        })
        return (
          <li key={index} className={cnames} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        )
      })}
    </ul>
  )
  
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <ul><Icon icon="spinner" spin/></ul>}
      {(suggestions.length > 0) && generateDropDown()}
    </div>
  )
}

export default AutoComplete;