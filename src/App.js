//App.js

import React from 'react';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Table from 'react-bootstrap/Table';
import './App.css';
import 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

/**
 * Função que irá ler os dados da API
 * Working
 */
async function getCarros(){
  //ler os dados da api
  //https://create-react-app.dev/docs/proxying-api-requests-in-development/

  let carrosData = await fetch("api/CarrosAPI/");
  //se a Data estiver errada
  if(!carrosData.ok){
    console.error(carrosData);
    throw new Error("Não foi possível aceder a data dos carros.HTTP Code : ",carrosData.status);
  }
  //senão retorna Data em JSON format
  return await carrosData.json();

}

//
//
//
/**
 * invoca a API e envia os dados do novo Carro
 * @param {} dadosNovoCarro 
 * notworking
 */
async function addCarro(dadosNovoCarro){
  let formdados = new FormData();
  formdados.append("Marca",dadosNovoCarro.Marca);
  formdados.append("Modelo",dadosNovoCarro.Modelo);
  formdados.append("Versao",dadosNovoCarro.Versao);
  formdados.append("Combustivel",dadosNovoCarro.Combustivel);
  formdados.append("Ano",dadosNovoCarro.Ano);
  formdados.append("CilindradaouCapacidadeBateria",dadosNovoCarro.CilindradaouCapacidadeBateria);
  formdados.append("Potencia",dadosNovoCarro.Potencia);
  formdados.append("TipoCaixa",dadosNovoCarro.TipoCaixa);
  formdados.append("Nportas",dadosNovoCarro.Nportas);
  formdados.append("newfoto",dadosNovoCarro.newfoto);

  let resposta = await fetch("api/CarrosAPI/",{

      method:"POST",
      body: formdados
    }
  );
  if(!resposta.ok){
      console.log(resposta);
      console.error(resposta);
      throw new Error("Não foi possível adicionar o carro.HTTP Code : ",resposta.status);
    }
  //senão retorna resposta em JSON format
  return await resposta.json();
}

async function removeCarro(dadosCarroRemover){
  let formData = new FormData();
  formData.append("id", dadosCarroRemover.id);
  // send data to API
  let resposta = await fetch("api/CarrosAPI/" + dadosCarroRemover.id,
    {
      method: "DELETE",
      body: formData
    });
    console.log(resposta);
  if (!resposta.ok) {
    console.log(resposta);
    console.error(resposta);
    throw new Error("Não foi possível remover o carro. Code: ", resposta.status)
  }
  else {
    alert("O Carro foi eliminado!");
  }
}
/**Componente principal
do projeto */
class App extends React.Component{
  /**Construtor da classe */
  constructor(props){
    super(props);
    //nao se deve chamar o setState() no construtor, deve inicializar o state com o this.state
    this.state = {
      /**array que vai conter os dados dos carros, vindos da APi */
      arrayCar: [],
      //armazena o estado da App
      loadState: "",
      //guarda a msg de erro
      errorMessage : null
    }
  }

  componentDidMount(){
    this.LoadCarros();
  }

  async LoadCarros(){
    try {
      // ask for data, from API
      this.setState({
        loadState:"carregando dados"
      });
      let carrosFromAPI = await getCarros();
      // after receiving data, store it at state
      this.setState({
         arrayCar: carrosFromAPI ,
          loadState: "sucesso"
        });
    } catch (ex) {
      this.setState({
        loadState:"erro",
        errorMessage: ex.tostring()
      });
      console.error("Error: Não foi possível carregar carros data", ex)
    }
  }


  /**metodo que identifica o carro a ser removido @param {*} idCarro */
  handlerRemoveCarro = async (idCarro) => {
    try{
      await removeCarro(idCarro);

      await this.LoadCarros();
    }catch(erro){
      this.setState({
        errorMessage: erro.tostring()
        
      });
      console.error("Erro ao submeter os dados do novo carro", erro);

    }
    window.location.reload();
  }
  handlerAddCarro = async (newcarro) => {
    //read new carro data
    //send it to API
    //redraw the table

    try {
      await addCarro(newcarro);

      //Ponto 3

      await this.LoadCarros();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Carro; ", erro)
    }
    
    window.location.reload();
  }

  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { arrayCar } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div>
            <Navbar bg ="info" expand ="lg">
              <Container>
              <Navbar.Brand href="#home">GarageRevReact</Navbar.Brand>
              </Container>
            </Navbar>
            <div className="container">
              {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
              <Formulario  
              outDadosCarros={this.handlerAddCarro} />

              <div className="row">
                <div className="col-md-20">
                  <hr />
                  <h3>Tabela Carros </h3>
                  {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosCarros'.
                  Neste caso, está a receber o array JSON com os dados dos carros,
                  lidos da API */}
                  
                  <Tabela inDadosCarros={arrayCar} 
                  carro={this.handlerRemoveCarro} />
                  
                </div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }

}
export default App;



