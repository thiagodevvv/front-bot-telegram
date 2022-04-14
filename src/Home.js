import './style/Home.css'
import { useEffect, useContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card  from './dnd/Card'
import Dustbin  from './dnd/Dustbin.js'
import DustbinFinish from './dnd/DustbinFinish'
import axios from 'axios'
import { Context } from './Context/StateContext'

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


async function cancelarPedido (id, controlVisible) {
  try {
    const response = await axios.post('http://localhost:8000/dev/alterarStatusPedido', {
      status: 99,
      id: id
    })
    console.log('cancelando')
    console.log(response.data)
    controlVisible()
    alert('Sucesso ao cancelar')
  }catch(err) {
    alert('Error ao cancelar')
  }
}

function Modal ({controlVisible, pedido}) {
  return (
    <div style={{width: '100%', backgroundColor: 'white'}}>
      <div className='modal-cancelar'>
        <h1 style={{textAlign: 'center'}}>Cancelar Pedido</h1>
        <div>
          Número Pedido: {pedido._id} <br></br><br></br>
          {pedido.nomeCliente}
          {pedido.carrinho.map((produto, index) => {
            return <p key={index}>{produto.produto} - Qnt: {produto.qnt}</p>
          })}
          Total pedido: {parseInt(pedido.totalPedido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/> <br/>
          {pedido.endereco === 'retirada123$$' ? 'Retirada' :  `Entrega: ${pedido.endereco}`}
        </div>
        <div style={{display: 'flex', 'flexDirection': 'row', marginTop: 30}}>
          <button className='btn-confirma-cancelar' onClick={() => cancelarPedido(pedido._id, controlVisible)} >Confirmar</button>
          <button className='btn-nao-cancelar' onClick={() => controlVisible()}>Não confirma</button>
        </div>
      </div>
    </div>
  )
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
          <h1 style={{marginLeft: 10}}>Pedidos</h1>
          {pedidos.map(pedido => {
            if(pedido.status == '0')
              return <Card key={pedido._id} pedido={pedido} />
          })}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="container-accept-pedido-doing">
        <h1 style={{marginLeft: 10}}>Aceito/Fazendo</h1>
          <Dustbin pedidos={pedidos} />
       
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }} className="pedido-done">
          <h1 style={{marginLeft: 10}}>Pronto Entrega/Retirada</h1>
          <DustbinFinish pedidos={pedidos} /> 
        </div>
      </div>
    </DndProvider>
  )
}