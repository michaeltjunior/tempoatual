function Card({titulo, valor, unidade, icone, segundoValor, segundaUnidade, eventoClick }){    
    return(
        <p className='bg-gray-700 rounded-md p-1 w-fit m-1 text-sm pl-2 pr-2' onClick={eventoClick}>
            { titulo }

            <p className='flex justify-center'>            
                <span className='text-xl'> 
                  <span className='text-xl'> { valor } {unidade} </span> 

                  {
                    segundoValor
                    ?
                    <span className='text-xl'> { segundoValor } {segundaUnidade} </span> 
                    :
                    ''
                  }
                </span>
                
                {
                  icone  === 'UP'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./up.png')} width={30} alt=""/> </span>
                  :
                  icone === 'EQ'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./eq.png')} width={30} alt=""/> </span>
                  :
                  <span className='m-1 ml-2'> <img src={require('./down.png')} width={30} alt=""/> </span>
                }
            </p> 
        </p>
    )
}

export default Card;