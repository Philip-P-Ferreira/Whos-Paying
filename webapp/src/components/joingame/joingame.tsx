import * as React from "react"
import { Stack, Label, TextField, DefaultButton} from "@fluentui/react"
import * as Style from './styles'
import { Header } from "../home/header/header"
import { useDispatch, useSelector } from "react-redux"
import { setLoadingState, setLobbyCode, setNavigationView } from "../../redux/actions"
import { IState, NAVIGATION_VIEW } from "../../redux/state"
import { LoadingSpinner } from "../loadingspinner/loadingspinner"
import { joinLobbyApi } from "../../apis/api"
import { ToastsStore } from "react-toasts"

export const JoinGameView = () => {
  const [ code, setCode ] = React.useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IState) => state.isLoading )

  const onChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (!newValue) {
      setCode("")
    } else if (newValue.length <= 4) {
      setCode(newValue.toUpperCase())
    }
  }

  const joinGame = async () => {
    dispatch(setLoadingState(true))
    if (await joinLobbyApi(code)) {
      dispatch(setLobbyCode(code))
      dispatch(setNavigationView(NAVIGATION_VIEW.PLAYER_LOBBY))
    } else {
      ToastsStore.error("Failed to Join Lobby")
    }
    dispatch(setLoadingState(false))
  }

  return (
    <>
    <Header onLeftButtonClick={ () => dispatch(setNavigationView(NAVIGATION_VIEW.HOME))}/>
    <Stack style={ Style.wrapperStack }>
      <Stack style={ Style.joinGameStack }>
        <Label>Enter 4 Letter Code</Label>
        <TextField value={ code } onChange={ onChange }/>
        <DefaultButton text="Join" onClick={ () => joinGame()}/>
        <LoadingSpinner isLoading={ isLoading }/>
      </Stack>
    </Stack>
    </>
  )
}