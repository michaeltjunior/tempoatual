import { useState, useEffect } from 'react';
import Voltar from "./Voltar";

function HistoricoPrecipitacao({data, conjunto, eventoClick}){    
    const [dadosDia, setDadosDia] = useState([])    
    var dataHoje = new Date();
    var dia = dataHoje.getDate().toString(), mes = ((dataHoje.getMonth() + 1)).toString();
    var hoje = dia.padStart(2, '0') + "/" + mes.padStart(2, '0')+ "/" + dataHoje.getFullYear();

    useEffect(()=>
    {
        var dadosFiltrados = conjunto.filter((dado) => dado.dia + "/" + dado.mes + "/" + dado.ano === hoje)
        setDadosDia(dadosFiltrados)
    }, [data, conjunto, hoje])

    return(
        <section>
            Histórico de umidade relativa - {data}
            <center>
                <article className='w-fit'>
                    <p className='mb-1'> 
                        <span className='p-1 m-1 w-3/6 font-bold text-sm'> Horário </span>
                        <span className='p-1 m-1 w-3/6 font-bold text-sm'> Precipitação </span> 
                    </p>
                    {

                        dadosDia.map(item => (
                            <>
                                <p className='flex'> 
                                    <span className='bg-orange-400 rounded-md p-1 m-1 w-3/6 text-sm'> {item.hora}:{item.minutos} </span>
                                    <span className='bg-gray-700 rounded-md p-1 m-1 w-3/6 text-sm'> {item.precipitacao}mm </span> 
                                </p>
                            </>
                        ))                    
                    }
                </article>
            </center>

            <Voltar eventoClick={eventoClick} />
        </section>
    )
}

export default HistoricoPrecipitacao;