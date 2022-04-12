import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'


const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	margin: '10px',
	cursor: 'move',
  borderRadius: '10px'
}



export default function Box ({pedido}) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { pedido },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult ) {
        alert(`Droped ::::: ${item.pedido} into ${dropResult.pedido}`)
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
      {pedido.carrinho.map(produto => {
        return <p>{produto.produto} - Qnt: {produto.qnt}</p>
      })}
      Total pedido: {parseInt(pedido.totalPedido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br/> <br/>
      {pedido.endereco === 'retirada123$$' ? 'Retirada' :  `Entrega: ${pedido.endereco}`}
    </div>
  )
}