import React, { createContext } from 'react'
import StatePages from './hooks/State'

const Context = createContext()

function StateProvider ({children}) {
  const { page, setPageView, isVisibleModal, setOpenModal, cancelarPedido, pedidoCancelar,
          isLoading, setLoading
  } = StatePages()
  
  return (
    <Context.Provider value={{page, setPageView, isVisibleModal, setOpenModal, cancelarPedido, pedidoCancelar,
        isLoading, setLoading
    }}>
        {children}
    </Context.Provider>
  )
} 


export {
  Context,
  StateProvider
}