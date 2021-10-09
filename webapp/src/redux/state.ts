export interface IState {
  currentUser: IUser | null
  navigationView: NAVIGATION_VIEW
}

export interface IUser {
  name: string,
  sessionID: string,
}

export enum NAVIGATION_VIEW {
  LOGIN = "LOGIN",
  HOME = "HOME",
  PROFILE = "PROFILE",
  JOIN = "JOIN",
  PLAYER_LOBBY = "PLAYER_LOBBY",
  START_GAME = "START_GAME",
  HOST_LOBBY = "HOST_LOBBY",
  PLAY_GAME = "PLAY_GAME",
}

export const initialState: IState = {
  currentUser: null,
  navigationView: NAVIGATION_VIEW.LOGIN,
}