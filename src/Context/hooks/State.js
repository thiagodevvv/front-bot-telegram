import { useState } from 'react'


export default function StatePages() {
  // 0 = Page Home 
  // 1 = Disparar Mensagens
  // 2 = Historico de pedigos
  const [page, setPage] = useState('0')
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [pedidoCancelar, setPedidoCancelar] = useState({})
  function setPageView (page)  {
    setPage(page)
  }

  function setOpenModal () {
    setIsVisibleModal(isVisibleModal ? false : true)
  }
  
  function cancelarPedido (pedido) {
    setPedidoCancelar(pedido)
  }
  return {
    page,
    isVisibleModal,
    pedidoCancelar, 
    setPageView,
    setOpenModal,
    cancelarPedido
  }
}