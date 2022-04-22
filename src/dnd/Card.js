import '../style/Card.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../Context/StateContext'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import deParaStatus from '../deParaStatus.json'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
  marginLeft: '10px',
  marginRight: '10px',
  marginBottom: '10px',
	cursor: 'move',
  borderRadius: '10px',
  color: 'black',
  display: 'flex',
  flexDirection: 'column'

}



export default function Card ({pedido}) {

  const { setOpenModal, cancelarPedido, setLoading } = useContext(Context)
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { pedido },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult ) {
        setLoading(true)
        const status = deParaStatus[dropResult.name]
        await axios.post('http://localhost:8000/dev/alterarStatusPedido', {
          status: status,
          id: item.pedido._id
        })
        setLoading(false)
        alert(`Pedido: ${item.pedido._id} Adicionado em  ${dropResult.name}`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId
    })
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <div
      ref={drag}
      role="Box"
      style={{...style, opacity}}
    >
      {pedido.nomeCliente}
      {pedido.carrinho.map((produto, index) => {
        return <p key={index}>{produto.produto} - Qnt: {produto.qnt}</p>
      })}
      Total pedido: {parseInt(pedido.totalPedido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/> <br/>
      {pedido.endereco === 'retirada123$$' ? 'Retirada' :  `Entrega: ${pedido.endereco}`}
      
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <button onClick={() =>  {
          setOpenModal()
          cancelarPedido(pedido)
        }} className='cancelar-pedido'>Cancelar Pedido</button>
        <p style={{opacity: 0.5}}>{pedido.data}</p>
      </div>
    </div>
  )
}