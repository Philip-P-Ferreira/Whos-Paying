import * as React from 'react'
import { Header } from '../home/header/header'
import { Stack, Label, List, Text } from '@fluentui/react'
import { useDispatch } from 'react-redux'
import { setLoadingState, setNavigationView } from '../../redux/actions'
import { NAVIGATION_VIEW } from '../../redux/state'
import * as Styles from './styles'
import { balanceApi } from '../../apis/api'

export const ProfileView = () => {
  
  const [balances, setBalances] = React.useState<number[]>([]) 
  const dispatch = useDispatch()

  const getBalance = async () => {
    dispatch(setLoadingState(true))
    const balance = await balanceApi()
    dispatch(setLoadingState(false))
    
    if (balance) {
      setBalances([balance])
    }
  }

  React.useEffect( () => {
    getBalance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header onLeftButtonClick={ ()=> dispatch(setNavigationView(NAVIGATION_VIEW.HOME))}/>
      <Stack>
        <Label style={ Styles.accountLabel }>Accounts</Label>
        <List
          items={ balances }
          onRenderCell={ onRenderCell }
          />
      </Stack>
    </>
  )
}

const onRenderCell = (item?: number): React.ReactElement | null => {
  if (!item) {
    return null
  }
  return (
    <Stack>
      <Label>Credit Card</Label>
      <Text>{ "$" + item }</Text>
    </Stack>
  )
}