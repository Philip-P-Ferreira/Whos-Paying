import * as React from 'react'
import { Header } from '../home/header/header'
import { Stack, Label, List, Text, IconButton } from '@fluentui/react'
import { getMockAccountList, IMockAccount } from '../../mockdata/profile'
import { useDispatch } from 'react-redux'
import { setNavigationView } from '../../redux/actions'
import { NAVIGATION_VIEW } from '../../redux/state'
import * as Styles from './styles'

export const ProfileView = () => {

  const accounts = getMockAccountList()
  const dispatch = useDispatch()

  const renderBackButton = () => {

    const onBackClick = () => { dispatch(setNavigationView(NAVIGATION_VIEW.HOME))}
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
        onClick={ onBackClick }/>
    )
  }
  return (
    <>
      <Header
        renderLeftButton={ renderBackButton }
        />
      <Stack>
        <Label style={ Styles.accountLabel }>Accounts</Label>
        <List
          items={ accounts }
          onRenderCell={ onRenderCell }
          />
      </Stack>
    </>
  )
}

const onRenderCell = (item?: IMockAccount): React.ReactElement | null => {
  if (!item) {
    return null
  }
  return (
    <Stack>
      <Label>{ item.nickname }</Label>
      <Text>{ "$" + item.balance }</Text>
    </Stack>
  )
}