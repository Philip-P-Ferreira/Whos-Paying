import { IUser, NAVIGATION_VIEW } from "./state";

export enum ACTION_TYPES {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  SET_NAVIGATION_VIEW = "SET_NAVIGATION_VIEW",
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

export type IAction = 
ISetUser | 
IClearUser |
ISetNavigationView