import { useState, useEffect } from 'react';
import styles from './App.module.css'

function App(){
    /*const [detalhes, setDetalhes] = useState([])*/

    /* variaveis de testes, para evitar muitos acessos à API */
    const [cidade, setcidade] = useState('')
    const [regiao, setregiao] = useState('')
    const [pais, setpais] = useState('')
    const [condicao, setcondicao] = useState('')
    const [temp, settemp] = useState('')
    const [orvalho, setorvalho] = useState('')
    const [sensacao, setsensacao] = useState('')
    const [pressao, setpressao] = useState('')
    const [umidade, setumidade] = useState('')
    const [direcao, setdirecao] = useState('')
    const [intensidade, setintensidade] = useState('')
    const [graus, setgraus] = useState('')
    /*const [cobertura, setcobertura] = useState('')*/
    const [precipitacao, setprecipitacao] = useState('')
    const [visibilidade, setvisibilidade] = useState('')
    const [uv, setuv] = useState('')
    const [icone, seticone] = useState('')

    useEffect(()=>
        {
            fetch('http://api.weatherapi.com/v1/current.json?key=eedebbd2289747d7b40125129242407&q=Criciuma&aqi=no',
            {
                method: 'GET',
                mode: 'cors',
                headers: {'Access-Control-Allow-Origin':'*'}
        })
            .then(res => res.json())
            .then(res =>{setData(res)})
            .catch((err) => alert(err))
        }, [])

    function setData(res){
        setcidade(res.location.name)
        setregiao(res.location.region)
        setpais(res.location.country)
        setcondicao(res.current.condition.text)
        settemp(res.current.temp_c)
        setorvalho(res.current.dewpoint_c)
        setsensacao(res.current.feelslike_c)
        setpressao(res.current.pressure_mb)
        setumidade(res.current.humidity)
        setdirecao(res.current.wind_dir)
        setintensidade(res.current.wind_kph)
        setgraus(res.current.wind_degree)
        /*setcobertura(res.current.cloud)*/
        setprecipitacao(res.current.precip_mm)
        setvisibilidade(res.current.vis_km)
        setuv(res.current.uv)
        seticone('http:'+res.current.condition.icon)
    }

    return(
        <div className={styles.tela}>
            <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'></link>

            <table className={styles.tabela}>
                <tr> <td colspan="3"> <div className={`${styles.fonte200} ${styles.fonteBranco}`}> {cidade}, {regiao}, {pais} </div> </td></tr>

                <tr>
                    <td>
                        <table> 
                            <tr><td colspan="2"> <p>Temperatura</p> </td></tr>
                            <tr> <td colspan="2"> <div className={`${styles.fonte400} ${styles.fonteAmarelo}`}> {temp}°C </div> </td></tr>
                            <tr> <td> <p>Ponto de orvalho</p> </td><td> <div className={`${styles.fonte200} ${styles.fonteAzul}`}>  {orvalho}°C </div> </td></tr>
                            <tr> <td> <p>Sensação térmica</p></td><td> <div className={`${styles.fonte200} ${styles.fonteAmarelo}`}> {sensacao}°C </div> </td></tr>
                        </table>
                    </td>
                    <td> 
                        <table>
                            <tr>
                                <td> <div className={`${styles.fonte400} ${styles.fonteBranco}`}> {condicao} </div> </td>
                            </tr>
                            <tr>
                                <td> <p>Pressão</p> </td>
                            </tr>
                            <tr>
                                <td> <div className={`${styles.fonte200} ${styles.fonteAmarelo}`}> {pressao}hPa </div> </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table> 
                            <tr> <td> <p>Vento</p></td></tr>
                            <tr> <td> <div className={`${styles.fonte400} ${styles.fonteBranco}`}> {direcao}</div> </td></tr>
                            <tr> <td> <div className={`${styles.fonte200} ${styles.fonteBranco}`}> {graus}º </div> </td></tr>
                            <tr> <td> <div className={`${styles.fonte200} ${styles.fonteBranco}`}> {intensidade} km/h</div> </td></tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table> 
                            <tr> <td> <p>Umidade relativa</p> </td></tr>
                            <tr><td> <div className={`${styles.fonte400} ${styles.fonteAzul}`}> {umidade} %</div> </td></tr>
                            <tr> <td> <p>Precipitação</p> </td></tr>
                            <tr> <td> <div className={`${styles.fonte400} ${styles.fonteAzul}`}> {precipitacao} mm</div> </td></tr>
                        </table>
                    </td>
                    <td>
                        <center> <img src={icone} alt=""/> </center>
                    </td>
                    <td> 
                        <table>
                            <tr> <td> <p>Visibildade</p> </td></tr>
                            <tr>
                                <td> <div className={`${styles.fonte400} ${styles.fonteAzul}`}> {visibilidade} km</div> </td>
                            </tr>
                            <tr> <td> <p>Radiação UV</p> </td></tr>
                            <tr>
                                <td> <div className={`${styles.fonte400} ${styles.fonteAzul}`}> {uv} </div> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default App