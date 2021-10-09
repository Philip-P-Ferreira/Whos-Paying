import { createStore, applyMiddleware, Store } from "redux"
import { IAction } from "./actions"
import { reducer } from "./reducers"
import { IState } from "./state"
import thunk from "redux-thunk"

export const store: Store<IState, IAction> = createStore(reducer, applyMiddleware(thunk))
