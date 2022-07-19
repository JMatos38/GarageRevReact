import React from 'react';

import Tabela from './Tabela';
import Formulario from './Formulario';

async function getAllCarros(){
  //ler os dados da api
  //https://create-react-app.dev/docs/proxying-api-requests-in-development/

  let carrosData = await fetch("api/API/");
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
async function addCarro(car){

  let formdados = new FormData();
  formdados.append("Marca",car.Marca);
  formdados.append("Modelo",car.Modelo);
  formdados.append("Versão",car.Versao);
  formdados.append("Combustivel",car.Combustivel);
  formdados.append("Ano",car.Ano);
  formdados.append("Cilindrada/CapacidadeBateria",car.CilindradaouCapacidadeBateria);
  formdados.append("Potencia",car.Potencia);
  formdados.append("TipoCaixa",car.TipoCaixa);
  formdados.append("Numero Portas",car.Nportas);
  formdados.append("Foto",car.Foto);

  let resposta = await fetch("api/API/",{

      method:"POST",
      body: formdados
    }
  );
  if(!resposta.ok){
      console.error(resposta);
      throw new Error("Não foi possível adicionar o carro.HTTP Code : ",resposta.status);
    }
  //senão retorna resposta em JSON format
  return await resposta.json();
}

async function removeCarro(car){
  let formData = new FormData();
  formData.append("id", car.Id);
  // send data to API
  let resposta = await fetch("api/API/" + car.Id,
    {
      method: "DELETE",
      body: formData
    })
  if (!resposta.ok) {
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
      //array q vai conter os dados do carro, vindos da API
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
      this.setState({loadState:"carregando dados"});
      let carrosFromAPI = await getAllCarros();
      // after receiving data, store it at state
      this.setState({ carros: carrosFromAPI , loadState: "sucesso"})
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

      
    }catch(erro){
      this.setState({
        errorMessage: erro.tostring()
        
      });
      console.error("Erro ao submeter os dados do novo carro", erro);

    }
    await this.LoadCarros();
  }
  handlerAddCarro = async (newcarro) => {
    //read new carro data
    //send it to API
    //redraw the table

    try {
      await addCarro(newcarro);

      //Ponto 3
      
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Carro; ", erro)
    }
    await this.LoadCarros();
    window.location.reload();
  }

  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { car } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Fotografia do Carro</h1>
            {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
            <Formulario inDadosCarros={car} outDadosFotos={this.handlerAddCarro} />

            <div className="row">
              <div className="col-md-20">
                <hr />
                <h3>Tabela com os Carros</h3>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos carros,
                lidos da API */}
                <Tabela inDadosCarros={car} carros={this.handlerRemoveCarro} />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }

}
export default App;



