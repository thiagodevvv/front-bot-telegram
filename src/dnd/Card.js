import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import axios from 'axios'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
  marginLeft: '10px',
  marginRight: '10px',
  marginBottom: '10px',
	cursor: 'move',
  borderRadius: '10px',
  color: 'black'
}



export default function Card ({pedido}) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { pedido },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult ) {
        await axios.post('http://localhost:8000/dev/alterarStatusPedido', {
          status: dropResult.name === 'Aceito/Fazendo' ? 1 : 2,
          id: item.pedido._id
        })
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
    </div>
  )
}