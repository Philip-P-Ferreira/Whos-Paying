import { IUser, NAVIGATION_VIEW } from "./state";

export enum ACTION_TYPES {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  SET_NAVIGATION_VIEW = "SET_NAVIGATION_VIEW",
  SET_LOADING_STATE = "SET_LOADING_STATE",
  SET_LOBBY_CODE = "SET_LOBBY_CODE",
}

interface ISetUser {
  type: ACTION_TYPES.SET_CURRENT_USER,
  user: IUser,
}

export function setUser(user: IUser): ISetUser {
  return {
    type: ACTION_TYPES.SET_CURRENT_USER,
    user,
  }
}

interface IClearUser {
  type: ACTION_TYPES.CLEAR_CURRENT_USER,
  user: null,
}
export function clearUser(): IClearUser {
  return {
    type: ACTION_TYPES.CLEAR_CURRENT_USER,
    user: null,
  }
}

interface ISetNavigationView {
  type: ACTION_TYPES.SET_NAVIGATION_VIEW,
  navigationView: NAVIGATION_VIEW,
}

export function setNavigationView(view: NAVIGATION_VIEW): ISetNavigationView {
  return {
    type: ACTION_TYPES.SET_NAVIGATION_VIEW,
    navigationView: view,
  }
}

export interface ISetLoadingState {
  type: ACTION_TYPES.SET_LOADING_STATE,
  isLoading: boolean,
}

export function setLoadingState(isLoading: boolean): ISetLoadingState {
  return {
    type: ACTION_TYPES.SET_LOADING_STATE,
    isLoading
  }
}

export interface ISetLobbyCode {
  type: ACTION_TYPES.SET_LOBBY_CODE,
  lobbyCode: string
}

export function setLobbyCode(lobbyCode: string): ISetLobbyCode {
  return {
    type: ACTION_TYPES.SET_LOBBY_CODE,
    lobbyCode,
  }
}

export type IAction = 
ISetUser | 
IClearUser |
ISetNavigationView |
ISetLoadingState |
ISetLobbyCode