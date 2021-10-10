import * as React from 'react'
import { Header } from './header/header'
import { DefaultButton, Stack, IconButton} from '@fluentui/react'
import * as Styles from './styles'
import { useDispatch } from 'react-redux'
import { setNavigationView } from '../../redux/actions'
import { NAVIGATION_VIEW } from '../../redux/state'

export const HomeView = (): React.ReactElement => {

  const dispatch = useDispatch()

  const renderProfileButton = () => {

    const onClick = () => { dispatch(setNavigationView(NAVIGATION_VIEW.PROFILE)) }
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
        onClick={ onClick } />
    )
  }

  return (
    <>
      <Header
        renderRightButton={ renderProfileButton }/>
      <Stack style={ Styles.buttonStack }>
        <DefaultButton text={ "Start Game" } style={ Styles.gameButton }/>
        <DefaultButton text={ "Join Game" } style={ Styles.gameButton }/>
      </Stack>
      </>
  )
}