import React, {
  ReactElement
} from 'react'
import {storiesOf} from '@storybook/react'
import {AutoComplete, DataSourceType} from './autoComplete'
import { action } from '@storybook/addon-actions'

interface LakerPlayerProps {
  number: number
}

const simpleComplete = (): ReactElement => {
  const lakers = [
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0}
  ]

  // const handleFetch = (query: string): DataSourceType<LakerPlayerProps>[] => {
  //   return lakers.filter(item => item.value.includes(query))
  // }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({items}) => {
      console.log(items)
      const formatItems: Promise<DataSourceType[]> = items.slice(0, 10).map((item: any) => ({
        value: item.login,
        ...item
      }))
      return formatItems
    })
  }

  const renderOption = (item: DataSourceType): ReactElement => {
   const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
    <>
      <h2>
        Name: {itemWithNumber.value}
      </h2>
      <p>
        Number: {itemWithNumber.number}
      </p>
    </>
   ) 
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComponent', simpleComplete)