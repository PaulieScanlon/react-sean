import React from 'react'

import { AppProvider } from './src/context'

export const wrapPageElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}
