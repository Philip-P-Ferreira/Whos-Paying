import * as React from 'react'
import { TextField, Stack, Label, DefaultButton } from '@fluentui/react'
import * as styles from './styles'
import { useDispatch } from 'react-redux'
import { setNavigationView, setUser } from '../../redux/actions'
import { NAVIGATION_VIEW } from '../../redux/state'

export const LoginView = (): React.ReactElement => {
  
  const [ userName, setUserName ] = React.useState("")
  const [ password, setPassword ] = React.useState("")
  const dispatch = useDispatch();

  const onUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setUserName(newValue ?? '')
 }

 const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
  setPassword(newValue ?? '')
}

const onSignInClick = () => {
  dispatch(setUser({
    name: userName,
    sessionID: "",
  }));

  dispatch(setNavigationView(NAVIGATION_VIEW.HOME))
}

  return <Stack style={ styles.loginStack }>
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
  </Stack>
}

