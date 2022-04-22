import './style/Loading.css'

export default function Loading ({controlVisible, pedido}) {
  return (
    <div style={{width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className='loading' >
          <p>Carregando</p>
      </div>
    </div>
  )
}