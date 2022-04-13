import './style/Home.css'
import { useEffect, useContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card  from './dnd/Card'
import Dustbin  from './dnd/Dustbin.js'
import { Context } from './Context/StateContext'
import axios from 'axios'


let pollingTimeout
async function pollingPedidos(setPedidos) {
  const response = await axios.get('http://localhost:8000/dev/buscaPedidos')
  console.log(response.data.msg)
  setPedidos(response.data.msg)
  pollingTimeout = setTimeout(() => pollingPedidos(setPedidos), 3000)
}

export default function Home () {
  const [pedidos, setPedidos] = useState([])
  useEffect(() => {
    pollingPedidos(setPedidos)
    return () => {
      console.log('unmounts')
      clearTimeout(pollingTimeout)
    }
  },[])


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-home'>
        <div className='container-pedidos' style={{ overflow: 'hidden', clear: 'both' }}>
          <h1 style={{marginLeft: 10}}>Pedidos</h1>
          {pedidos.map(pedido => {
            return <Card key={pedido._id} pedido={pedido} />
          })}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="container-accept-pedido-doing">
        <h1 style={{marginLeft: 10}}>Aceito/Fazendo</h1>
          <Dustbin /> 
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h1 style={{marginLeft: 10}}>Pronto Entrega/Retirada</h1>
          <Dustbin /> 
        </div>
      </div>
    </DndProvider>
  )
}