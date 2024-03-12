

function CardHistorico({hora, minutos, valor1,  valor2}){
    var cab3Colunas = 'bg-orange-400 rounded-md p-1 m-1 w-3/6 text-sm'
    var item3Colunas = 'bg-gray-700 rounded-md p-1 m-1 w-3/6 text-sm'

    var cabecalho = cab3Colunas
    var item = item3Colunas

    return(
        <p className='flex'> 
            <span className={cabecalho}> {hora}:{minutos} </span>
            <span className={item}> {valor1} </span>
            {
                valor2
                ?
                <span className={item}> {valor2} </span> 
                :
                <></>
            }
        </p>    
    )
}

export default CardHistorico;