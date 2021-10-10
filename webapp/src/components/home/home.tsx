import * as React from 'react'
import { Header } from './header/header'
import { DefaultButton, Stack} from '@fluentui/react'
import * as Styles from './styles'
import { useDispatch } from 'react-redux'
import { setNavigationView } from '../../redux/actions'
import { NAVIGATION_VIEW } from '../../redux/state'

export const HomeView = (): React.ReactElement => {

  const dispatch = useDispatch()

  const onJoinGameClick = () => { dispatch(setNavigationView(NAVIGATION_VIEW.JOIN))}

  return (
    <>
      <Header onRightButtonClick={ () => dispatch(setNavigationView(NAVIGATION_VIEW.PROFILE))} />
      <Stack style={ Styles.buttonStack }>
        <DefaultButton text={ "Start Game" } style={ Styles.gameButton }/>
        <DefaultButton text={ "Join Game" } style={ Styles.gameButton } onClick={ onJoinGameClick }/>
      </Stack>
      </>
  )
}