import React, { createContext } from 'react'
import StatePages from './hooks/State'

const Context = createContext()

function StateProvider ({children}) {
  const { page, setPageView, isVisibleModal, setOpenModal, cancelarPedido, pedidoCancelar } = StatePages()
  return (
    <Context.Provider value={{page, setPageView, isVisibleModal, setOpenModal, cancelarPedido, pedidoCancelar}}>
        {children}
    </Context.Provider>
  )
} 


export {
  Context,
  StateProvider
}