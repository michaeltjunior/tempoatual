import { useState, useEffect } from 'react';
import { IndiceCalor } from './IndiceCalor.mjs';

function MinMax({conjunto, parametro}){    
  const [minimo, setMin] = useState()
  const [maximo, setMax] = useState()

  useEffect(()=>
  {
    var dataHoje = new Date();
    var dia = dataHoje.getDate().toString(), mes = ((dataHoje.getMonth() + 1)).toString();
    var hoje = dia.padStart(2, '0') + "/" + mes.padStart(2, '0')+ "/" + dataHoje.getFullYear();
    var max, min;
    var dadosFiltrados = conjunto.filter((dado) => dado.dia + "/" + dado.mes + "/" + dado.ano === hoje)
    var dadosDia;

    max = -99999;
    min = 90000;

    dadosDia = dadosFiltrados

    var i;

    for (i = 0; i < dadosDia.length; i++){
      if(parametro === '1'){
        // temperatura  
        if((dadosDia[i].temperatura < min && parseFloat(dadosDia[i].temperatura) !== -17.78) || min === 90000){ min = dadosDia[i].temperatura }
        if((dadosDia[i].temperatura >= max) || max === -99999){ max = dadosDia[i].temperatura }
      }else{
        if(parametro === '2'){
          // pressao
          if((dadosDia[i].pressao < min && dadosDia[i].pressao > 0) || min === 90000){ min = dadosDia[i].pressao }
          if((dadosDia[i].pressao >= max) || max === -99999){ max = dadosDia[i].pressao }
        }else{
          if(parametro === '3'){
            // umidade
            console.log(dadosDia[i].umidade + ' x ' + max)
            if((parseInt(dadosDia[i].umidade) < min) || min === 90000){ if(parseInt(dadosDia[i].umidade) > 0) { min = parseInt(dadosDia[i].umidade)}}
            if((parseInt(dadosDia[i].umidade) >= max) || max === -99999){ max = parseInt(dadosDia[i].umidade) }
          }else{
            if(parametro === '4'){
              // UV
              if((dadosDia[i].uv < min) || min === 90000){ min = dadosDia[i].uv }
              if((dadosDia[i].uv >= max) || max === -99999){ max = dadosDia[i].uv }
            }else{
              if(parametro === '5'){
                // vento (velocidade)
                if((dadosDia[i].velocidade < min) || min === 90000){ min = dadosDia[i].velocidade }
                if((dadosDia[i].velocidade >= max) || max === -99999){ max = dadosDia[i].velocidade }
              }else{
                if(parametro === '7'){
                  // indice de calor
                  var indiceAtual = IndiceCalor(dadosDia[i].temperatura, dadosDia[i].umidade)

                  if((indiceAtual < min && indiceAtual > 0) || min === 90000){ min = indiceAtual }
                  if((indiceAtual >= max) || max === -99999){ max = indiceAtual }
                }else{
                  if(parametro === '9'){
                    // precipitacao
                    if((dadosDia[i].precipitacao < min) || min === 90000){ min = dadosDia[i].precipitacao }
                    if((dadosDia[i].precipitacao >= max) || max === -99999){ max = dadosDia[i].precipitacao }
                  }else{
                    // sensação
                    if((dadosDia[i].sensacao < min) || min === 90000){ min = dadosDia[i].sensacao }
                    if((dadosDia[i].sensacao >= max) || max === -99999){ max = dadosDia[i].sensacao }
                  }
                }
              }
            }
          }
        }
      }      
    }
    setMin(min)
    setMax(max)
  }, [conjunto, parametro])

  return(
    <div className='bg-gray-700 rounded-md text-sm mb-1 pl-1 pr-1 w-full'>
      <div className='text-red-400 p-1'> {maximo} </div>
      <div className='text-blue-400 p-1 text-sm'> {minimo} </div>
    </div>
    )
  }
  
  export default MinMax;