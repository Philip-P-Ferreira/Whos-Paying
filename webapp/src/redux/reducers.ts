import { ACTION_TYPES, IAction } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, action: IAction): IState => {
  switch(action.type) {
    case (ACTION_TYPES.SET_CURRENT_USER):
      return {...state, currentUser: action.user}

    case (ACTION_TYPES.CLEAR_CURRENT_USER):
      return {...state, currentUser: null}

    case (ACTION_TYPES.SET_NAVIGATION_VIEW):
      return {...state, navigationView: action.navigationView}

    case (ACTION_TYPES.SET_LOADING_STATE):
      return {...state, isLoading: action.isLoading}

    case (ACTION_TYPES.SET_LOBBY_CODE):
      return {...state, lobbyCode: action.lobbyCode}
    
    default:
      console.log("UNHANDLED ACTION TYPE");
      return state;
  }
}