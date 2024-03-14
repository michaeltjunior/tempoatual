import { useState, useEffect } from 'react';

function CardHistorico({hora, minutos, valor1,  valor2, indice, indiceCalor}){
    const [classe, setClasse] = useState('')
    var cab3Colunas = 'bg-gray-600 rounded-md p-1 m-1 w-3/6 text-sm'
    var item3Colunas = 'bg-gray-700 rounded-md p-1 m-1 w-3/6 text-sm'

    useEffect(()=>
    {
        if((parseFloat(indice)< 27) || indiceCalor!=='S'){
            setClasse(item3Colunas)
        }else{
            if(parseFloat(indice) >= 27 && parseFloat(indice) < 32){
                setClasse('bg-amber-500 rounded-md p-1 m-1 w-3/6 text-sm');
                }else{
                    if(parseFloat(indice) >= 32 && parseFloat(indice) < 41){
                        setClasse('bg-orange-700 rounded-md p-1 m-1 w-3/6 text-sm');
                    }else{
                        if(parseFloat(indice) >= 41 && parseFloat(indice) < 54){
                            setClasse('bg-red-700 rounded-md p-1 m-1 w-3/6 text-sm');
                        }else{            
                            setClasse('bg-rose-800 rounded-md p-1 m-1 w-3/6 text-sm');
                    }
                }
            }
        }
    }, [indice, item3Colunas, indiceCalor])


    var cabecalho = cab3Colunas
    var item = item3Colunas
    
    return(
        <p className='flex'> 
            <span className={cabecalho}> {hora}:{minutos} </span>
            <span className={item}> {valor1} </span>
            {
                valor2
                ?
                <span className={classe ? classe : item3Colunas}> {valor2} </span> 
                :
                <></>
            }
        </p>    
    )
}

export default CardHistorico;