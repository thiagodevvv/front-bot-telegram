import './style/Home.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Box  from './dnd/Box'
import Dustbin  from './dnd/Dustbin.js'

export default function Home () {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-home'>
        <div className='container-pedidos' style={{ overflow: 'hidden', clear: 'both' }}>
          <h1>Pedidos</h1>
          <Box name="Pedido1" />
          <Box name="Pedido2" />
          <Box name="Pedido3" />
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="container-accept-pedido-doing">
        <h1>Aceito/Fazendo</h1>
          <Dustbin /> 
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h1>Pronto Entrega/Retirada</h1>
          <Dustbin /> 
        </div>
      </div>
    </DndProvider>
  )
}