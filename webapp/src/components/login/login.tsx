import * as React from 'react'
import { TextField, Label, DefaultButton } from '@fluentui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingState, setNavigationView, setUser } from '../../redux/actions'
import { IState, NAVIGATION_VIEW } from '../../redux/state'
import { LoadingSpinner } from '../loadingspinner/loadingspinner'
import { loginApi } from '../../apis/api'
import { ToastsStore } from 'react-toasts'

export const LoginView = (): React.ReactElement => {
  
  const [ userName, setUserName ] = React.useState("")
  const [ password, setPassword ] = React.useState("")
  const dispatch = useDispatch();
  const isLoading = useSelector( (state: IState) => state.isLoading )

  const onUsernameChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setUserName(newValue ?? '')
 }

 const onPasswordChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
  setPassword(newValue ?? '')
}

const loginUser = async () => {
  dispatch(setLoadingState(true))
  const valid = await loginApi(userName, password)
  dispatch(setLoadingState(false))

  if (valid) {
    dispatch(setUser({
      name: userName,
      sessionID: "",
    }));
    dispatch(setNavigationView(NAVIGATION_VIEW.HOME))
  } else {
    setUserName("")
    setPassword("")
    ToastsStore.error("Invalid Credentials")
  }
}

const onSignInClick = () => {
  loginUser()
}

  return (
    <>
      <Label>Login</Label>
        <TextField
          label="username"
          value={ userName }
          onChange={ onUsernameChange }/>
        <TextField
          label="password"
          type="password"
          value={ password }
          onChange={ onPasswordChange }
          canRevealPassword={ true }
          revealPasswordAriaLabel="Show Password"/>
        <DefaultButton text="Login" onClick={ onSignInClick }/>
        <LoadingSpinner isLoading={ isLoading }/>
      </>
  )
}

