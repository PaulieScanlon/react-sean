import React, { FunctionComponent, Dispatch, createContext, useReducer } from 'react'

import { dummyImage } from '../fixtures'

export enum IActionTypes {
  images = 'images',
}

interface IAppInitialState {
  captureAmount: number
  localImages: string[] | null
}

const initialState: IAppInitialState = {
  captureAmount: 5,
  localImages: [...dummyImage],
}

export const reducer = (state: IAppInitialState, action: any): IAppInitialState => {
  switch (action.type) {
    case IActionTypes.images: {
      return { ...state, localImages: action.payload }
    }
    default:
      return state
  }
}

export const AppContext = createContext<{ state: IAppInitialState; dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
})

export const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
