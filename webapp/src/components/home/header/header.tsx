import * as React from 'react'
import { Stack, Text } from '@fluentui/react'
import { useSelector } from 'react-redux'
import { IState } from '../../../redux/state'
import * as Styles from './styles'

interface IProps {
  renderLeftButton?: () => React.ReactElement | null
  renderRightButton?: () => React.ReactElement | null
}

export const Header = (props: IProps): React.ReactElement => {
  const userName = useSelector((state: IState) => state.currentUser?.name)
  const { renderLeftButton, renderRightButton } = props
  

  return (
    <Stack horizontal={ true } style={ Styles.headerStack }>
      <Stack.Item>{ renderLeftButton ? renderLeftButton() : renderButtonPlaceholder() }</Stack.Item>
      <Stack.Item grow={ true } style={ Styles.headerTextStackItem }>
        <Text variant={ "xxLarge" } nowrap={ true }>{ userName }</Text>
      </Stack.Item>
      <Stack.Item>{ renderRightButton ? renderRightButton() : renderButtonPlaceholder() }</Stack.Item>
    </Stack>
  )
}

const renderButtonPlaceholder = () => <div style={ Styles.buttonPlaceholder }/>
