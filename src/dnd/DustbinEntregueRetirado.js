import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import Card from './Card'

const style = {
	height: '100%',
	width: '100%'
}

export default function DustbinFinish ({pedidos}) {
  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({name: 'Entregue/Retirado'}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver
  let backgroundColor = "white"
  if(isActive) {
    backgroundColor = "green"
  }
  else if (canDrop) {
    backgroundColor = "#98FB98"
  }
  return (
    <div ref={drop} role={'Dustbin'} style={{...style, backgroundColor}}>
      {isActive ? 'Pronto para soltar' : ''}
      {!isActive ? pedidos.map(pedido => {
        if(pedido.status == 4 ){
          return <Card key={pedido._id} pedido={pedido} />
        }
      }) : ''}
    </div>
  ) 
}