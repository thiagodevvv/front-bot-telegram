import { useState } from 'react'


export default function StatePages() {
  // 0 = Page Home 
  // 1 = Disparar Mensagens
  // 2 = Historico de pedigos
  const [page, setPage] = useState('0')
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [pedidoCancelar, setPedidoCancelar] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  function setPageView (page)  {
    setPage(page)
  }

  function setOpenModal () {
    setIsVisibleModal(isVisibleModal ? false : true)
  }
  
  function cancelarPedido (pedido) {
    setPedidoCancelar(pedido)
  }
  function setLoading(state) {
    setIsLoading(state)
  }
  return {
    page,
    isVisibleModal,
    pedidoCancelar, 
    isLoading,
    setPageView,
    setOpenModal,
    cancelarPedido,
    setLoading
  }
}