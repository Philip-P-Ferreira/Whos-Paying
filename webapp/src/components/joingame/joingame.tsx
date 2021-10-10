import * as React from "react"
import { Stack, Label, TextField, DefaultButton} from "@fluentui/react"
import * as Style from './styles'
import { Header } from "../home/header/header"
import { useDispatch } from "react-redux"
import { setNavigationView } from "../../redux/actions"
import { NAVIGATION_VIEW } from "../../redux/state"

export const JoinGameView = () => {
  const [ code, setCode ] = React.useState("")
  const dispatch = useDispatch()

  const onChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (newValue && newValue?.length <= 4) {
      setCode(newValue.toUpperCase())
    } else {
      setCode("")
    }
    
  }

  return (
    <>
    <Header onLeftButtonClick={ () => dispatch(setNavigationView(NAVIGATION_VIEW.HOME))}/>
    <Stack style={ Style.wrapperStack }>
      <Stack style={ Style.joinGameStack }>
        <Label>Enter 4 Letter Code</Label>
        <TextField value={ code } onChange={ onChange }/>
        <DefaultButton text="Join"/>
      </Stack>
    </Stack>
    </>
  )
}