import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Input from './input'

const defaultInput = (): React.ReactElement => (
  <Input 
    onFocus={action('focus')} 
    onChange={action('change')}
  />
)

const InputWithIcon = (): React.ReactElement => (
  <Input icon="search" />
)

const InputWithPrefix = (): React.ReactElement => (
    <Input 
      prepand="http://"
      append=".com"
    />
)

const DisabledInput = (): React.ReactElement => (
  <Input
    disabled
  />
)

const differentSizeInput = (): React.ReactElement => (
  <div>
    <Input
      size="lg"
      style={{marginRight: '10px'}}
    />
    <Input
      size="sm"
    />
  </div>
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('带图标的Input', InputWithIcon)
  .add('带前后缀的Input', InputWithPrefix)
  .add('被禁用的Input', DisabledInput)
  .add('不同大小的Input', differentSizeInput)