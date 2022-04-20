import axios from 'axios'

async function cancelarPedido (id, controlVisible) {
  try {
    const response = await axios.post('http://localhost:8000/dev/alterarStatusPedido', {
      //status 99 cancela pedido
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



export default function Modal ({controlVisible, pedido}) {
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