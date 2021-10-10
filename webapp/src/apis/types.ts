export interface IUsername {
  ready: boolean,
  username: string
}

export interface ILobbyState {
  bill: number,
  usernames: IUsername[]
}

export interface IGameInfo {
  numbers: number[],
  target: number,
}