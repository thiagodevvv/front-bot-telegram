import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'


const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	margin: '10px',
	cursor: 'move',
}

export default function Box ({name}) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult ) {
        alert(`Droped ::::: ${item.name} into ${dropResult.name}`)
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
      data-testid={`box- ${name}`}
    >
      {name}
    </div>
  )
}