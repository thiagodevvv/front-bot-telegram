import './style/Home.css'
import { useEffect, useContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card  from './dnd/Card'
import Dustbin  from './dnd/Dustbin.js'
import DustbinFinish from './dnd/DustbinFinish'
import DustbinSaiuEntrega from './dnd/DustbinSaiuEntrega.js'
import DustbinEntregueRetirado from './dnd/DustbinEntregueRetirado.js'
import axios from 'axios'
import { Context } from './Context/StateContext'
import Modal from './ModalCancelar.js'
// const pedidos = [ {
//   "_id": "624ad8daf46883dfe21bbee7",
//   "carrinho": [
//       {
//           "produto": "  COCA COLA 2L",
//           "preco": 10,
//           "qnt": 1
//       },
//       {
//           "produto": "  X-BACON",
//           "preco": 15,
//           "qnt": 1
//       }
//   ],
//   "endereco": "retirada123$$",
//   "totalPedido": "25",
//   "telefoneCliente": "5287311557",
//   "nomeCliente": "Thiag",
//   "status": "0"
// },
// {
//   "_id": "624adbabb029ddad097e4c94",
//   "carrinho": [
//       {
//           "produto": "  X-BACON",
//           "preco": 15,
//           "qnt": 2
//       }
//   ],
//   "endereco": "retirada123$$",
//   "totalPedido": "30",
//   "telefoneCliente": "5287311557",
//   "nomeCliente": "Thiag",
//   "status": "2"
// },
// {
//   "_id": "624adbfbf0390d9a5f46b08b",
//   "carrinho": [
//       {
//           "produto": "  Suco 600ML",
//           "preco": 50,
//           "qnt": 1
//       },
//       {
//           "produto": "  X-SALADA COMPLETO",
//           "preco": 10,
//           "qnt": 1
//       },
//       {
//           "produto": "  X-BACON",
//           "preco": 15,
//           "qnt": 1
//       },
//       {
//           "produto": "  X-TUDO",
//           "preco": 25,
//           "qnt": 1
//       }
//   ],
//   "endereco": "Rua Francisco Polido",
//   "totalPedido": "100",
//   "telefoneCliente": "5287311557",
//   "nomeCliente": "Thiag",
//   "status": "2"
// }]
var pollingTimeout
async function pollingPedidos(setPedidos) {
  const response = await axios.get('http://localhost:8000/dev/buscaPedidos')
  console.log(response.data.msg)
  setPedidos(response.data.msg)
  pollingTimeout = setTimeout(() => pollingPedidos(setPedidos), 1500)
}


export default function Home () {
  const { isVisibleModal, setOpenModal, pedidoCancelar } = useContext(Context)
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
        {isVisibleModal ? <Modal controlVisible={setOpenModal} pedido={pedidoCancelar}/> : ''}
        <div className='container-pedidos' style={{ overflow: 'hidden', clear: 'both' }}>
          <h2 style={{marginLeft: 10}}>Pedidos</h2>
          {pedidos.map(pedido => {
            if(pedido.status == '0')
              return <Card key={pedido._id} pedido={pedido} />
          })}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="container-accept-pedido-doing">
        <h2 style={{marginLeft: 10}}>Aceito/Fazendo</h2>
          <Dustbin pedidos={pedidos} />
       
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h2 style={{marginLeft: 10}}>Pronto Entrega/Retirada</h2>
          <DustbinFinish pedidos={pedidos} /> 
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h2 style={{marginLeft: 10}}>Saiu para Entrega</h2>
          <DustbinSaiuEntrega pedidos={pedidos} /> 
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h2 style={{marginLeft: 10}}>Entregue/Retirado</h2>
          <DustbinEntregueRetirado pedidos={pedidos} /> 
        </div>
      </div>
    </DndProvider>
  )
}