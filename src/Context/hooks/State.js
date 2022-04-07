import { useState } from 'react'


export default function StatePages() {
  // 0 = Page Home 
  // 1 = Disparar Mensagens
  // 2 = Historico de pedigos
  const [page, setPage] = useState('0')
  function setPageView (page)  {
    console.log('????')
    setPage(page)
  }
  return {
    page, 
    setPageView
  }
}