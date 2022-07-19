/**
 * App.js
 */

 import React from "react";
 import Table from './Tabela';
 
 /**
  * ler carros da API
  */
 async function getCarros() {
   // ler carros da API
   let dadosCarros = await fetch("api/CarrosAPI/"); 
 
   // verificar os dados
   if (!dadosCarros.ok) {
     // erro HTTP = 200
     console.error(dadosCarros);
     throw new Error("Erro a aceder aos dados dos Carros. HTTP: ",
                     dadosCarros.state);
   }
 
   // retornar dados em formato json
   return await dadosCarros.json();
 }
 
 
 
 
 class App extends React.Component {
   state = {
     carros: []
   }

   componentDidMount() {
     this.LoadCarros();
   }
 
   /**
    * carregar os dados dos carros
    */
   async LoadCarros() {
     try {
       // receber/pedir dados
       let carrosAPI = await getCarros();
       // guardar dados
       this.setState({ carros: carrosAPI })
     } catch (ex) {
       console.error("Não foi possível obter os dados dos Carros", ex)
     }
   }
 
 
 
   render() {
     const{carros}=this.state;
 
     return (
       <div className="container">
         <h1>Carros</h1>
 
         <br />
         <h4>Lista completa de Carros</h4>
         <Table inDadosCarros={carros} />
       </div>
     )
   }
 }
 export default App;