import './App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import HistoricoTemp from './HistoricoTemp';
import HistoricoPressao from './HistoricoPressao';
import HistoricoUmidade from './HistoricoUmidade';
import HistoricoUV from './HistoricoUV';
import HistoricoVento from './HistoricoVento';
import MinMax from './MinMax';
import { IndiceCalor } from './IndiceCalor.mjs';
import HistoricoIndiceCalor from './HistoricoIndiceCalor';
import HistoricoPrecipitacao from './HistoricoPrecipitacao';

function App() {
  const [tempAtual, setTempAtual] = useState();
  //const [sensacaoAtual, setSensacaoAtual] = useState();
  const [umidadeAtual, setUmidadeAtual] = useState();
  const [direcaoAtual, setDirecaoAtual] = useState();
  const [velocidadeAtual, setVelocidadeAtual] = useState();
  const [horaAtual, setHoraAtual] = useState();
  const [dataAtual, setDataAtual] = useState();
  const [pressaoAtual, setPressaoAtual] = useState();
  const [condicaoAtual, setCondicaoAtual] = useState();
  const [UVAtual, setUVAtual] = useState();
  const [precipitacaoAtual, setPrecipitacaoAtual] = useState();
  const [tela, setTela] = useState(0);
  const[conjunto, setConjunto] = useState([]);
  const[indiceCalorAtual, setIndiceCalorAtual] = useState(0)

  const [tendenciaTemp, setTendenciaTemp] = useState('UP');
  //const [tendenciaSensacao, setTendenciaSensacao] = useState('UP');
  const [tendenciaUmidade, setTendenciaUmidade] = useState('UP');
  const [tendenciaVento, setTendenciaVento] = useState('UP');
  const [tendenciaPressao, setTendenciaPressao] = useState('UP');
  const [tendenciaUV, setTendenciaUV] = useState('UP');
  const [tendenciaCalor, setTendenciaCalor] = useState('UP');
  const [tendenciaPrecipitacao, setTendenciaPrecipitacao] = useState('UP');

  function ordenar(a, b) {
    if (a.seq < b.seq ) {
      return -1;
    } else if (a.seq > b.seq ) {
      return 1;
    } else {
       return 0;
    }
}

function getDataAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  var dataFormatada = conjunto[seqAtual].dia + "/" + conjunto[seqAtual].mes + "/" + conjunto[seqAtual].ano
  
  return dataFormatada;
}

function getHoraAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  return conjunto[seqAtual].hora + ":" + conjunto[seqAtual].minutos
}

function getCondicaoAtual(conjunto){
  var condicoes = {'Showers in the Vicinity': 'Chuva ao redor', 'Heavy Rain': 'Chuva forte', Rain: 'Chuva', Cloudy: 'Nublado', 
                  Fair: 'Céu claro', 'Partly Cloudy': 'Parcialmente nublado', 'Light Rain': 'Chuva fraca', 'Rain Shower': 'Chuva forte', 
                  Sunny: 'Ensolarado', 'Mostly Cloudy': 'Encoberto'};
  var seqAtual = conjunto.length - 1;
  var condicaoOriginal = conjunto[seqAtual].cobertura;

  return condicoes[condicaoOriginal];
}

function getIndiceCalorAtual(conjunto){
  var seqAtual = conjunto.length - 1;

  var indiceAtual = IndiceCalor(conjunto[seqAtual].temperatura, conjunto[seqAtual].umidade)
  var indiceAnterior = IndiceCalor(conjunto[seqAtual-1].temperatura, conjunto[seqAtual-1].umidade)

  if (indiceAtual === indiceAnterior){
    setTendenciaCalor('EQ')
  }else{
    if (indiceAtual > indiceAnterior){
      setTendenciaCalor('UP')
    }else{
      setTendenciaCalor('DOWN')
    }
  }
  
  return indiceAtual;
}

function getUVAtual(conjunto){
  var seqAtual = conjunto.length - 1;

  if (conjunto[seqAtual].uv === conjunto[seqAtual-1].uv){
    setTendenciaUV('EQ')
  }else{
    if (conjunto[seqAtual].uv > conjunto[seqAtual-1].uv){
      setTendenciaUV('UP')
    }else{
      setTendenciaUV('DOWN')
    }
  }
  
  return conjunto[seqAtual].uv;
}

function getPressaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;

if (conjunto[seqAtual].pressao === conjunto[seqAtual-1].pressao){
  setTendenciaPressao('EQ')
}else{
  if (conjunto[seqAtual].pressao > conjunto[seqAtual-1].pressao){
    setTendenciaPressao('UP')
  }else{
    setTendenciaPressao('DOWN')
  }
}
  
  return conjunto[seqAtual].pressao;
}

function getTemperaturaAtual(conjunto){
  var seqAtual = conjunto.length - 1;

  if (conjunto[seqAtual].temperatura === conjunto[seqAtual-1].temperatura){
    setTendenciaTemp('EQ')
  }else{
    if (conjunto[seqAtual].temperatura > conjunto[seqAtual-1].temperatura){
      setTendenciaTemp('UP')
    }else{
      setTendenciaTemp('DOWN')
    }
  }
  
  return conjunto[seqAtual].temperatura;
}

/*function getSensacaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].sensacao === conjunto[seqAtual-1].sensacao){
    setTendenciaSensacao('EQ')
  }else{
    if (conjunto[seqAtual].sensacao > conjunto[seqAtual-1].sensacao){
      setTendenciaSensacao('UP')
    }else{
      setTendenciaSensacao('DOWN')
    }
  }

  return conjunto[seqAtual].sensacao;
}*/

function getUmidadeAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].umidade === conjunto[seqAtual-1].umidade){
    setTendenciaUmidade('EQ')
  }else{
    if (conjunto[seqAtual].umidade > conjunto[seqAtual-1].umidade){
      setTendenciaUmidade('UP')
    }else{
      setTendenciaUmidade('DOWN')
    }
  }

  return conjunto[seqAtual].umidade;
}

function getDirecaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  return conjunto[seqAtual].direcao;
}

function getPrecipitacaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;

  if (conjunto[seqAtual].precipitacao === conjunto[seqAtual-1].precipitacao){
    setTendenciaPrecipitacao('EQ')
  }else{
    if (conjunto[seqAtual].precipitacao > conjunto[seqAtual-1].precipitacao){
      setTendenciaPrecipitacao('UP')
    }else{
      setTendenciaPrecipitacao('DOWN')
    }
  }
  
  return conjunto[seqAtual].precipitacao;
}

function getVelocidadeAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].velocidade === conjunto[seqAtual-1].velocidade){
    setTendenciaVento('EQ')
  }else{
    if (conjunto[seqAtual].velocidade > conjunto[seqAtual-1].velocidade){
      setTendenciaVento('UP')
    }else{
      setTendenciaVento('DOWN')
    }
  }

  return conjunto[seqAtual].velocidade;
}

function historicoTemp(){
  setTela(1);
}

function historicoPressao(){
  setTela(2);
}

function historicoUmidade(){
  setTela(3);
}

function historicoUV(){
  setTela(4);
}

function historicoVento(){
  setTela(5);
}

function historicoIndiceCalor(){
  setTela(7);
}

function historicoPrecipitacao(){
  setTela(8);
}

function voltar(){
  setTela(0)
}

useEffect(()=>
  {
      fetch(`https://intelliseven.com.br/meteo/currentwx`,
      {
          method: 'GET',
          headers: {'Content-type': 'Application/json',
      },
  })
    .then(res => res.json())
    .then(items => items.sort(ordenar))
    .then(res => {
      setTela(0);
      setConjunto(res);
      setTempAtual(getTemperaturaAtual(res));
      //setSensacaoAtual(getSensacaoAtual(res));
      setUmidadeAtual(getUmidadeAtual(res));
      setDirecaoAtual(getDirecaoAtual(res));
      setVelocidadeAtual(getVelocidadeAtual(res));
      setHoraAtual(getHoraAtual(res));
      setDataAtual(getDataAtual(res));
      setPressaoAtual(getPressaoAtual(res));
      setCondicaoAtual(getCondicaoAtual(res));
      setUVAtual(getUVAtual(res));
      setPrecipitacaoAtual(getPrecipitacaoAtual(res));
      setIndiceCalorAtual(getIndiceCalorAtual(res));
  })
      .catch((err) => alert(err))
  }, [])

  return (
    <main className='bg-gray-600'>
        <section className='bg-gray-500 m-5 p-2 rounded-lg text-center text-gray-200'>
          <p className='text-3xl font-bold'> Criciúma, SC </p>
          <p> {horaAtual} - <b> {condicaoAtual} </b> </p>
          {/*<p> (Precipitação: {precipitacaoAtual} mm) </p>*/}
          {
            tela === 0
            ?                      
            <article className='mt-1'>
              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./thermometer.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Temperatura" valor={tempAtual} unidade="°C" icone={tendenciaTemp} eventoClick={historicoTemp}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="1"/> </div>
              </p>

              {/*<p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./thermometer.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Sensação térmica" valor={sensacaoAtual} unidade="°C" icone={tendenciaSensacao} eventoClick={historicoTemp}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="6"/> </div>
              </p>*/}

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./heat.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Índice de calor" valor={indiceCalorAtual} unidade="°C" icone={tendenciaCalor} eventoClick={historicoIndiceCalor}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="7"/> </div>
              </p>

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./rain.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Precipitação" valor={precipitacaoAtual} unidade="mm" icone={tendenciaPrecipitacao} eventoClick={historicoPrecipitacao}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="9"/> </div>
              </p>

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./humidity.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Umidade relativa" valor={umidadeAtual} unidade="%" icone={tendenciaUmidade} eventoClick={historicoUmidade}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="3"/> </div>
              </p>

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./ultra-violet.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Radiação UV (1-12)" valor={UVAtual} unidade="" icone={tendenciaUV} eventoClick={historicoUV}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="4"/> </div>
              </p>

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./windy.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Vento" segundoValor={velocidadeAtual} segundaUnidade="km/h" icone={tendenciaVento} valor={direcaoAtual} unidade="°" eventoClick={historicoVento}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="5"/> </div>
              </p>

              <p className='grid grid-cols-12 gap-1'>
                <span className='grid place-items-center col-span-2'> <center> <img src={require('./barometer-.png')} width={40} alt=""/> </center> </span>
                <div className='col-span-7'><Card titulo="Pressão" icone={tendenciaPressao} valor={pressaoAtual} unidade="hPa" eventoClick={historicoPressao}/></div>
                <div className='grid place-items-center col-span-3'> <MinMax conjunto={conjunto} parametro="2"/> </div>
              </p>
            </article>
            :
            tela === 1
            ?
            <HistoricoTemp data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 2
            ?
            <HistoricoPressao data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 3
            ?
            <HistoricoUmidade data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 4
            ?
            <HistoricoUV data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 5
            ?
            <HistoricoVento data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 6
            ?
            <HistoricoVento data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 7
            ?
            <HistoricoIndiceCalor data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            tela === 8
            ?
            <HistoricoPrecipitacao data = {dataAtual} conjunto={conjunto} eventoClick={voltar} />
            :
            <></>
          }
        </section> 
    </main>
  );
}

export default App;
