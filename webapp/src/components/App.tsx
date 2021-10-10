import React, { CSSProperties, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { IState, NAVIGATION_VIEW } from '../redux/state';
import { LoginView } from './login/login';
import { Stack } from '@fluentui/react'
import { HomeView } from './home/home';
import { ProfileView } from './profile/profile';
import { JoinGameView } from './joingame/joingame';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const App = () =>{
  const navigationView = useSelector( (state: IState) => state.navigationView)

  const getView = (): ReactElement | null => {
    switch (navigationView) {
      case NAVIGATION_VIEW.LOGIN:
        return <LoginView/>
      case NAVIGATION_VIEW.HOME:
        return <HomeView/>
      case NAVIGATION_VIEW.PROFILE:
        return <ProfileView/>
      case NAVIGATION_VIEW.JOIN:
        return <JoinGameView/>
      default:
        return null
    }
  }

  return (
    <Stack style={ mainStackStyle }>
      <Stack style={ centeredStackStyle }>
        { getView() }
        <ToastsContainer store={ ToastsStore } position={ ToastsContainerPosition.BOTTOM_CENTER }/>
      </Stack>
    </Stack>
  )
}
export default App

const mainStackStyle: CSSProperties = {
  alignItems: "center",
  overflow: "hidden",
}

const centeredStackStyle: CSSProperties = {
  maxWidth: 300,
  width: '100%',
  overflow: "hidden"
}