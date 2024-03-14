function Card({titulo, valor, unidade, icone, segundoValor, segundaUnidade, eventoClick }){    
  function classeValor(){
    var classe = 'flex justify-center bg-gray-700 rounded-md';

    if(titulo === 'Índice de calor'){
      if(parseInt(valor) < 27){
        classe = 'flex justify-center bg-gray-700 rounded-md';
      }else{
        if(parseInt(valor) >= 27 && parseInt(valor) < 32){
          classe = 'flex justify-center bg-amber-500 rounded-md';
        }else{
          if(parseInt(valor) >= 32 && parseInt(valor) < 41){
            classe = 'flex justify-center bg-orange-700 rounded-md';
          }else{
            if(parseInt(valor) >= 41 && parseInt(valor) < 54){
              classe = 'flex justify-center bg-red-700 rounded-md';
            }else{            
              classe = 'flex justify-center bg-rose-800 rounded-md';
            }
          } 
        }
      }
    }

    return classe;
  }

  return(
    <div className='bg-gray-700 rounded-md text-sm mt-1 pl-2 pr-2' onClick={eventoClick}>
      <b> { titulo } </b>

      <p className='flex justify-center'>            
        <span className={classeValor()}>
          <span className='text-xl ml-2'> { valor } <span className='text-sm'> {unidade} </span> </span> 
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