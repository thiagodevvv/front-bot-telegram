import React, { createContext } from 'react'
import StatePages from './hooks/State'

const Context = createContext()

function StateProvider ({children}) {
  const { page, setPageView } = StatePages()
  return (
    <Context.Provider value={{page, setPageView}}>
        {children}
    </Context.Provider>
  )
} 


export {
  Context,
  StateProvider
}