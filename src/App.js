import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tempAtual, setTempAtual] = useState();
  const [sensacaoAtual, setSensacaoAtual] = useState();
  const [umidadeAtual, setUmidadeAtual] = useState();
  const [direcaoAtual, setDirecaoAtual] = useState();
  const [velocidadeAtual, setVelocidadeAtual] = useState();
  const [horaAtual, setHoraAtual] = useState();
  const [tendenciaTemp, setTendenciaTemp] = useState('UP');
  const [tendenciaSensacao, setTendenciaSensacao] = useState('UP');
  const [tendenciaUmidade, setTendenciaUmidade] = useState('UP');
  const [tendenciaVento, setTendenciaVento] = useState('UP');
  
//  function ordenar(a, b) {
//    if (a.seq < b.seq ) {
//      return -1;
//    } else if (a.seq > b.seq ) {
//      return 1;
//    } else {
//       return 0;
//    }
//}

function getHoraAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  var horario = conjunto[seqAtual].hora.substring(11, 16);
  var hora = horario.substring(0, 2) - 3;
  var minutos = horario.substring(3, 5);
  
  return hora + ':' + minutos;
}

function getTemperaturaAtual(conjunto){
  var seqAtual = conjunto.length - 1;

  if (conjunto[seqAtual].temperatura > conjunto[seqAtual-1].temperatura){
    setTendenciaTemp('UP')
  }else{
    setTendenciaTemp('DOWN')
  }
  
  return conjunto[seqAtual].temperatura;
}

function getSensacaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].sensacao > conjunto[seqAtual-1].sensacao){
    setTendenciaSensacao('UP')
  }else{
    setTendenciaSensacao('DOWN')
  }

  return conjunto[seqAtual].sensacao;
}

function getUmidadeAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].umidade > conjunto[seqAtual-1].umidade){
    setTendenciaUmidade('UP')
  }else{
    setTendenciaUmidade('DOWN')
  }

  return conjunto[seqAtual].umidade;
}

function getDirecaoAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  return conjunto[seqAtual].direcao;
}

function getVelocidadeAtual(conjunto){
  var seqAtual = conjunto.length - 1;
  
  if (conjunto[seqAtual].velocidade > conjunto[seqAtual-1].velocidade){
    setTendenciaVento('UP')
  }else{
    setTendenciaVento('DOWN')
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
    //.then(items => items.sort(ordenar))
    .then(res => {
      setTempAtual(getTemperaturaAtual(res));
      setSensacaoAtual(getSensacaoAtual(res));
      setUmidadeAtual(getUmidadeAtual(res));
      setDirecaoAtual(getDirecaoAtual(res));
      setVelocidadeAtual(getVelocidadeAtual(res));
      setHoraAtual(getHoraAtual(res));
  })
      .catch((err) => alert(err))
  }, [])

  return (
    <main>
      <section className='bg-gray-500 m-10 p-2 rounded-lg text-center text-gray-200'>
        <p className='text-3xl font-bold'> Tempo atual - Criciúma, SC </p>
        <p> {horaAtual} </p>
        
        <article>
          <center> 
          <p className='bg-gray-700 rounded-md pt-1 p-2 w-fit m-2'> Temperatura
              <p className='flex'>
                <span className='text-3xl'> 
                  { tempAtual }°C 
                </span> 
                {
                  tendenciaTemp === 'UP'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./up.png')} width={30} alt=""/> </span>
                  :
                  <span className='m-1 ml-2'> <img src={require('./down.png')} width={30} alt=""/> </span>
                }
              </p>
            </p>

            <p className='bg-gray-700 rounded-md pt-1 p-2 w-fit m-2'> Sensação térmica
              <p className='flex'>
                <span className='text-3xl'> 
                  { sensacaoAtual }°C 
                </span>
                
                {
                  tendenciaSensacao  === 'UP'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./up.png')} width={30} alt=""/> </span>
                  :
                  <span className='m-1 ml-2'> <img src={require('./down.png')} width={30} alt=""/> </span>
                }
              </p>
            </p>

            <p className='bg-gray-700 rounded-md pt-1 p-2 w-fit m-2'> Umidade relativa
              <p className='flex'>
                <span className='text-3xl'> 
                  { umidadeAtual } %
                </span>
                
                {
                  tendenciaUmidade  === 'UP'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./up.png')} width={30} alt=""/> </span>
                  :
                  <span className='m-1 ml-2'> <img src={require('./down.png')} width={30} alt=""/> </span>
                }
              </p>
            </p>

            <p className='bg-gray-700 rounded-md pt-1 p-2 w-fit m-2'> Vento
              <p className='flex'>
                <span className='text-3xl'> 
                  <span className='text-3xl'> { direcaoAtual }°</span> 
                  <span className='text-3xl'> { velocidadeAtual } km/h</span> 
                </span>
                
                {
                  tendenciaVento  === 'UP'
                  ?
                  <span className='m-1 ml-2'> <img src={require('./up.png')} width={30} alt=""/> </span>
                  :
                  <span className='m-1 ml-2'> <img src={require('./down.png')} width={30} alt=""/> </span>
                }
              </p>
            </p>
         </center>
        </article>
      </section> 
    </main>
  );
}

export default App;
