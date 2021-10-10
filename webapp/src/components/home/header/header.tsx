import * as React from 'react'
import { Stack, Text, IconButton } from '@fluentui/react'
import { useSelector } from 'react-redux'
import { IState } from '../../../redux/state'
import * as Styles from './styles'

interface IProps {
  onLeftButtonClick?: () => void
  onRightButtonClick?: () => void
}

export const Header = (props: IProps): React.ReactElement => {
  const userName = useSelector((state: IState) => state.currentUser?.name)
  const { onLeftButtonClick, onRightButtonClick } = props

  const renderLeftButton = () => {
    if (onLeftButtonClick) {
      return (
        <IconButton
        iconProps={
          {
            iconName: "ChromeBack",
            style: {
              fontSize: 32,
            }
          }
        }
        onClick={ onLeftButtonClick }/>
      )
    } else {
      return renderButtonPlaceholder();
    }
  }

    const renderRightButton = () => {
      if (onRightButtonClick) {
        return (
        <IconButton
          iconProps={
            {
              iconName: "ContactInfo",
              style: {
                fontSize: 32,
              }
            }
          }
          onClick={ onRightButtonClick } />
        )
      } else {
        return renderButtonPlaceholder()
      }
    }
  

  return (
    <Stack horizontal={ true } style={ Styles.headerStack }>
      <Stack.Item>{ renderLeftButton() }</Stack.Item>
      <Stack.Item grow={ true } style={ Styles.headerTextStackItem }>
        <Text variant={ "xxLarge" } nowrap={ true }>{ userName }</Text>
      </Stack.Item>
      <Stack.Item>{ renderRightButton() }</Stack.Item>
    </Stack>
  )
}

const renderButtonPlaceholder = () => <div style={ Styles.buttonPlaceholder }/>
