import './App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import HistoricoTemp from './HistoricoTemp';
import HistoricoPressao from './HistoricoPressao';
import HistoricoUmidade from './HistoricoUmidade';

function App() {
  const [tempAtual, setTempAtual] = useState();
  const [sensacaoAtual, setSensacaoAtual] = useState();
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

  const [tendenciaTemp, setTendenciaTemp] = useState('UP');
  const [tendenciaSensacao, setTendenciaSensacao] = useState('UP');
  const [tendenciaUmidade, setTendenciaUmidade] = useState('UP');
  const [tendenciaVento, setTendenciaVento] = useState('UP');
  const [tendenciaPressao, setTendenciaPressao] = useState('UP');
  const [tendenciaUV, setTendenciaUV] = useState('UP');

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

function getSensacaoAtual(conjunto){
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
}

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
      setConjunto(res);
      setTempAtual(getTemperaturaAtual(res));
      setSensacaoAtual(getSensacaoAtual(res));
      setUmidadeAtual(getUmidadeAtual(res));
      setDirecaoAtual(getDirecaoAtual(res));
      setVelocidadeAtual(getVelocidadeAtual(res));
      setHoraAtual(getHoraAtual(res));
      setDataAtual(getDataAtual(res));
      setPressaoAtual(getPressaoAtual(res));
      setCondicaoAtual(getCondicaoAtual(res));
      setUVAtual(getUVAtual(res));
      setPrecipitacaoAtual(getPrecipitacaoAtual(res));
  })
      .catch((err) => alert(err))
  }, [])

  return (
    <main className='bg-gray-600'>
        <section className='bg-gray-500 m-5 p-2 rounded-lg text-center text-gray-200'>
          <p className='text-3xl font-bold'> Criciúma, SC </p>
          <p> {horaAtual} - <b> {condicaoAtual} </b> </p>
          
          {
            tela === 0
            ?          
            <article className='mt-1'>
              <center> 
                (Precipitação: {precipitacaoAtual} mm) 
                <div className='flex justify-center mt-2'>
                  <Card titulo="Temperatura" valor={tempAtual} unidade="°C" icone={tendenciaTemp} eventoClick={historicoTemp}/>
                  <Card titulo="Sensação térmica" valor={sensacaoAtual} unidade="°C" icone={tendenciaSensacao} eventoClick={historicoTemp}/>
                </div>
                <Card titulo="Umidade relativa" valor={umidadeAtual} unidade="%" icone={tendenciaUmidade} eventoClick={historicoUmidade}/>
                <Card titulo="Radiação UV (1-12)" valor={UVAtual} unidade="" icone={tendenciaUV}/>
                <Card titulo="Vento" segundoValor={velocidadeAtual} segundaUnidade="km/h" icone={tendenciaVento} valor={direcaoAtual} unidade="°"/>
                <Card titulo="Pressão" icone={tendenciaPressao} valor={pressaoAtual} unidade="hPa" eventoClick={historicoPressao}/>
            </center>
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
            <></>
          }
        </section> 
    </main>
  );
}

export default App;
