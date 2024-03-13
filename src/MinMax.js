import { useState, useEffect } from 'react';
import { IndiceCalor } from './IndiceCalor.mjs';

function MinMax({conjunto, parametro}){    
  
  
  var dataHoje = new Date();
  var dia = dataHoje.getDate().toString(), mes = ((dataHoje.getMonth() + 1)).toString();
  var hoje = dia.padStart(2, '0') + "/" + mes.padStart(2, '0')+ "/" + dataHoje.getFullYear();

  const [dadosDia, setDadosDia] = useState([]);
  const [minimo, setMin] = useState()
  const [maximo, setMax] = useState()

  useEffect(()=>
  {
    var max, min;
    var dadosFiltrados = conjunto.filter((dado) => dado.dia + "/" + dado.mes + "/" + dado.ano === hoje)

    max = -99999;
    min = 90000;

    setDadosDia(dadosFiltrados)

    var i;

    for (i = 0; i < dadosDia.length; i++){
      if(parametro === '1'){
        // temperatura  
        if((dadosDia[i].temperatura < min) || min === -99999){ min = dadosDia[i].temperatura }
        if((dadosDia[i].temperatura >= max) || max === 90000){ max = dadosDia[i].temperatura }
      }else{
        if(parametro === '2'){
          // pressao
          if((dadosDia[i].pressao < min) || min === -99999){ min = dadosDia[i].pressao }
          if((dadosDia[i].pressao >= max) || max === 90000){ max = dadosDia[i].pressao }
          }else{
          if(parametro === '3'){
            // umidade
            if((dadosDia[i].umidade < min) || min === -99999){ min = dadosDia[i].umidade }
            if((dadosDia[i].umidade >= max) || max === 90000){ max = dadosDia[i].umidade }    
          }else{
            if(parametro === '4'){
              // UV
              if((dadosDia[i].uv < min) || min === -99999){ min = dadosDia[i].uv }
              if((dadosDia[i].uv >= max) || max === 90000){ max = dadosDia[i].uv }
            }else{
              if(parametro === '5'){
                // vento (velocidade)
                if((dadosDia[i].velocidade < min) || min === -99999){ min = dadosDia[i].velocidade }
                if((dadosDia[i].velocidade >= max) || max === 90000){ max = dadosDia[i].velocidade }
              }else{
                if(parametro === '7'){
                  // indice de calor
                  var indiceAtual = IndiceCalor(dadosDia[i].temperatura, dadosDia[i].umidade)

                  if((indiceAtual < min) || min === -99999){ min = indiceAtual }
                  if((indiceAtual >= max) || max === 90000){ max = indiceAtual }
                  }else{
                    if(parametro === '9'){
                      // precipitacao
                      if((dadosDia[i].precipitacao < min) || min === -99999){ min = dadosDia[i].precipitacao }
                      if((dadosDia[i].precipitacao >= max) || max === 90000){ max = dadosDia[i].precipitacao }
                          }else{
                      // sensação
                      if((dadosDia[i].sensacao < min) || min === -99999){ min = dadosDia[i].sensacao }
                      if((dadosDia[i].sensacao >= max) || max === 90000){ max = dadosDia[i].sensacao }
                    }
                  }
              }
            }
          }
        }
      }
      
      setMin(min)
      setMax(max)
    }
  }, [conjunto, dadosDia, hoje, parametro])

  return(
    <div className='bg-gray-700 rounded-md p-1 m-1 text-sm pl-2 pr-2 w-full'>
      <div className='text-red-400 p-1'> {maximo} </div>
      <div></div>
      <div className='text-blue-400 p-1'> {minimo} </div>
    </div>
    )
  }
  
  export default MinMax;