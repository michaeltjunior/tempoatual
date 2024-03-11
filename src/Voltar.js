function Voltar({eventoClick}){    
    return(
        <div className="flex justify-center">
            <p className='bg-gray-700 rounded-md w-2/12 text-sm p-2 m-2' onClick={eventoClick}>
                Voltar
            </p>
        </div>
    )
}

export default Voltar;