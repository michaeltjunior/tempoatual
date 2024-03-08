import './App.css';
import { useState, useEffect } from 'react';
import Card from './Card';

function App() {
  const [tempAtual, setTempAtual] = useState();
  const [sensacaoAtual, setSensacaoAtual] = useState();
  const [umidadeAtual, setUmidadeAtual] = useState();
  const [direcaoAtual, setDirecaoAtual] = useState();
  const [velocidadeAtual, setVelocidadeAtual] = useState();
  const [horaAtual, setHoraAtual] = useState();
  const [pressaoAtual, setPressaoAtual] = useState();
  const [condicaoAtual, setCondicaoAtual] = useState();
  const [UVAtual, setUVAtual] = useState();
  const [precipitacaoAtual, setPrecipitacaoAtual] = useState();

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

function getHoraAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  var horario = conjunto[seqAtual].hora.substring(11, 16);
  var hora = horario.substring(0, 2) - 3;
  var minutos = horario.substring(3, 5);
  
  return hora + ':' + minutos;
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
      setTempAtual(getTemperaturaAtual(res));
      setSensacaoAtual(getSensacaoAtual(res));
      setUmidadeAtual(getUmidadeAtual(res));
      setDirecaoAtual(getDirecaoAtual(res));
      setVelocidadeAtual(getVelocidadeAtual(res));
      setHoraAtual(getHoraAtual(res));
      setPressaoAtual(getPressaoAtual(res));
      setCondicaoAtual(getCondicaoAtual(res));
      setUVAtual(getUVAtual(res));
      setPrecipitacaoAtual(getPrecipitacaoAtual(res));
  })
      .catch((err) => alert(err))
  }, [])

  return (
    <main className='bg-gray-600'>
      {/* <div className='grid grid-flow-col'> */}
        {/* <div> </div> */}

        <section className='bg-gray-500 m-5 p-2 rounded-lg text-center text-gray-200'>
          <p className='text-3xl font-bold'> Tempo atual - Criciúma, SC </p>
          <p> {horaAtual} - <b> {condicaoAtual} </b>
          <br/>
          (Precipitação: {precipitacaoAtual} mm) </p>
          
          <article className='mt-5'>
            <center> 
              <div className='flex justify-center'>
                <Card titulo="Temperatura" valor={tempAtual} unidade="°C" icone={tendenciaTemp}/>
                <Card titulo="Sensação térmica" valor={sensacaoAtual} unidade="°C" icone={tendenciaSensacao}/>
              </div>
              <Card titulo="Umidade relativa" valor={umidadeAtual} unidade="%" icone={tendenciaUmidade}/>
              <Card titulo="Radiação UV (1-12)" valor={UVAtual} unidade="" icone={tendenciaUV}/>
              <Card titulo="Vento" segundoValor={velocidadeAtual} segundaUnidade="km/h" icone={tendenciaVento} valor={direcaoAtual} unidade="°"/>
              <Card titulo="Pressão" icone={tendenciaPressao} valor={pressaoAtual} unidade="hPa"/>
          </center>
          </article>
        </section> 

        {/* <div> </div> */}
      {/* </div>*/}
    </main>
  );
}

export default App;
