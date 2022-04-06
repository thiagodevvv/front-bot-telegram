import './style/SideBar.css'

function SideBar() {
  return (
    <div className="SideBar">
      <div onClick={() => {}} className='box-icons-sidebar'>
        <img alt='Início' className='Icons' src="home.png"  />
        <p>Inicio</p>
      </div>
      <div className='box-icons-sidebar'>
        <img alt='Enviar Mensagens' className='Icons' src="send.png" />
        <p>Disparar Mensagens</p>
      </div>
      <div className='box-icons-sidebar'>
        <img alt='Ver Histórico' className='Icons' src="history.png" />
        <p>Histórico de Pedidos</p>  
      </div>
    </div>
  )
}


export default SideBar