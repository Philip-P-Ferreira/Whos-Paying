import React, { CSSProperties, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { IState, NAVIGATION_VIEW } from '../redux/state';
import { LoginView } from './login/login';
import { Stack } from '@fluentui/react'

const App = () =>{
  const navigationView = useSelector( (state: IState) => state.navigationView)

  const getView = (): ReactElement | null => {
    switch (navigationView) {
      case NAVIGATION_VIEW.LOGIN:
        return <LoginView/>
      default:
        return null
    }
  }

  return (
    <Stack style={ stackStyle }>
      { getView() }
    </Stack>
  )
}
export default App

const stackStyle: CSSProperties = {
  alignItems: "center",
  
}