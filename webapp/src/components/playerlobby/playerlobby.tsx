import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { leaveLobbyApi, lobbyStateApi } from '../../apis/api'
import { ILobbyState, IUsername } from '../../apis/types'
import { setLoadingState, setNavigationView } from '../../redux/actions'
import { IState, NAVIGATION_VIEW } from '../../redux/state'
import { Header } from '../home/header/header'
import { LoadingSpinner } from '../loadingspinner/loadingspinner'
import { Stack, Label, List, Text } from '@fluentui/react'
import { ToastsStore } from 'react-toasts'

export const PlayerLobby = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IState) => state.isLoading)
  const lobbyCode = useSelector((state: IState) => state.lobbyCode)
  const [ lobbyData, setLobbyData ] = React.useState<ILobbyState | null>()

  const updateLobby = async () => {
    setLobbyData(await lobbyStateApi(lobbyCode))
  }
  
  React.useEffect( () => {
    const interval = setInterval(updateLobby, 500)
    dispatch(setLoadingState(true))
    return () => {
      clearInterval(interval)
      dispatch(setLoadingState(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect( () => {
    if (lobbyData) {
      const checkIfReady = (lobbyData: ILobbyState) => {
        return lobbyData.usernames.every( (item) => item.ready)
      }
      if (checkIfReady(lobbyData)) {
        dispatch(NAVIGATION_VIEW.PLAY_GAME)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobbyData])

  const onRenderCell = (item?: IUsername, index?: number) => {

    if (item && index) {
      return (
        <Text>{ index + ". " + item.username}</Text>
      )
    }
    return null
  }

  const onLeaveLobby = async () => {
    dispatch(setNavigationView(NAVIGATION_VIEW.JOIN))
    if (!(await leaveLobbyApi())) {
      ToastsStore.error("Error occured while leaving lobby")
    }
  }

  return (
    <>
      <Header onLeftButtonClick={ () => onLeaveLobby() }/>
      <Stack>
        <LoadingSpinner isLoading={ isLoading }/>
        <Label>{ lobbyData ? "Bill: $" + lobbyData.bill : null }</Label>
        <List
          items={ lobbyData ? lobbyData.usernames : []}
          onRenderCell={ onRenderCell }/>
      </Stack>
    </>
  ) 
}