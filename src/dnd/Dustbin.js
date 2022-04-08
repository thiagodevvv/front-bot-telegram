import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'


const style = {
	height: '100%',
	width: '100%',
  margin: '10px',
	color: 'white',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

export default function Dustbin () {
  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({name: 'Dustbin'}),
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
    backgroundColor = "red"
  }
  return (
    <div ref={drop} role={'Dustbin'} style={{...style, backgroundColor}}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  ) 
}