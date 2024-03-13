import { useState, useEffect } from 'react';
import Voltar from "./Voltar";
import CardHistorico from './CardHistorico';
import { IndiceCalor } from './IndiceCalor.mjs';

function HistoricoIndiceCalor({data, conjunto, eventoClick}){    
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
            Histórico de Índice de calor - {data}
            <center>
                <article className='w-fit'>
                    <p className='mb-1'> 
                        <span className='p-1 m-1 w-3/6 font-bold text-sm'> Horário </span>
                        <span className='p-1 m-1 w-3/6 font-bold text-sm'> Temperatura °C</span> 
                        <span className='p-1 m-1 w-3/6 font-bold text-sm'> Índice °C</span> 
                    </p>
                    {

                        dadosDia.map(item => (
                            <>
                                <CardHistorico hora={item.hora} minutos={item.minutos} valor1={item.temperatura} valor2={IndiceCalor(item.temperatura, item.umidade)} />
                            </>
                        ))                    
                    }
                </article>
            </center>

            <Voltar eventoClick={eventoClick} />
        </section>
    )
}

export default HistoricoIndiceCalor;