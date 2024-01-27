import { useEffect, useState, useRef } from "react";
import gota from "./Images/gota.png";
import Erro from "./Pages/Erro/index";
import vento from "./Images/vento-icone.png"
import './buscarClima.css';
import { toast } from "react-toastify";



function BuscarClima() {

  const [busca, setBusca] = useState([]);
  const [description, setDescription] = useState()

  const html = useRef(''); // monitorando a descrição do tempo 
  const containe = useRef(''); // monitorando o container que recebe a imagem de fundo 
  let nome = useRef(null);

  async function getClima(e) {
    e.preventDefault();

    if (nome.current.value === '') return;

    let chave1 = '94ecc7415954d78dfc0b5a76263a122e'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nome.current.value.trim()}&appid=${chave1}&lang=pt_br&units=metric`

    await fetch(url)
      .then((resultado) => resultado.json())
      .then((resultado) => {

        if (resultado.message !== "city not found") {

          setBusca(resultado);
          setDescription(resultado.weather[0].description)
          return;
        }

        throw "cidade não existe"

      }).catch((erro) => {
        toast.warn(erro)


      })
    nome.current.focus()
    nome.current.value = ''
  };

  useEffect(() => {

    function trocaFundo() {
      // aqui fiz um switch cade pra mudar  pra esses fundos de acordo com esses casos 
      if (description !== '') return containe.current.className = `${description} fundo `;

    }
    trocaFundo();



  }, [description])


  return (

    <div className="fundo" ref={containe}>
      <Erro />


      <h1 className="header">Clima Tempo</h1>

      <div className="container-buscador">

        <form className="buscar" onSubmit={getClima}>
          <input ref={nome} className="place"
            type="text"
            placeholder="Digite seu Estado ou cidade ..." />

          <button>Buscar</button>

        </form>
      </div>

      <div className="logo">
        <h1>Clima Tempo</h1>
      </div>

      {busca.main && (

        <div className="resultados">
          <h2>{busca.name}</h2>

          <div className="maxima-minima">

            <h1 className="temperatura">{Math.floor(busca.main.temp)}°c</h1>

          </div>

          <div className="clima">

            <h3 ref={html} >{busca.weather[0].description.toUpperCase()}</h3>
            <p className="temperatura">{Math.floor(busca.main.temp_max)}°/{parseInt(busca.main.temp_min)}°</p>

          </div>
          <div className="container-icone">

            <img className="icone" src={`https://openweathermap.org/img/wn/${busca.weather[0].icon}.png`} alt="imagem-icone-tempo" />

          </div>
          <div className="ventos-incone">
            <h4>Vento</h4>
            <div className="container-vento">
              <img className="vento-i" src={vento} alt="" />
              <p className="vento">{busca.wind.speed} Km/h</p>
            </div>
            <h4>Humidade</h4>
            <div className="container-gota">
              <img className="gota" src={gota} alt="" />
              <p className="vento">{busca.main.humidity} %</p>
            </div>
          </div>

        </div>
      )}
      <div className="rodape">
        <h4>Copyright © Leonardo-dev</h4>
      </div>
    </div>
  )
}


export default BuscarClima;
