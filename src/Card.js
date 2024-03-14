function Card({titulo, valor, unidade, icone, segundoValor, segundaUnidade, eventoClick }){    
  return(
    <div className='bg-gray-700 rounded-md text-sm mt-1 pl-2 pr-2' onClick={eventoClick}>
      <b> { titulo } </b>

      <p className='flex justify-center'>            
        <span className='flex justify-center'>           
          <span className='text-xl'> { valor } <span className='text-sm'> {unidade} </span> </span> 
          {
            segundoValor 
            ?
            <span className='text-xl'>&nbsp;/ { segundoValor } <span className='text-sm'>{segundaUnidade}</span> </span> 
            :
            ''
          }
                
        {
          icone  === 'UP'
          ?
          <span className='m-1 ml-4'> <img src={require('./up.png')} width={25} alt=""/> </span>
          :
          icone === 'EQ'
          ?
          <span className='m-1 ml-4'> <img src={require('./eq.png')} width={25} alt=""/> </span>
          :
          <span className='m-1 ml-4'> <img src={require('./down.png')} width={25} alt=""/> </span>
        }
        </span>
      </p> 
    </div>
    )
}

export default Card;