//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'

/**
 * Formulário para adicionar (fazer upload) de um Carro
 */
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            marca: "",
            modelo: "",
            versao: "",
            foto: null,
            combustivel: "",
            ano: "",
            cilindradaouCapBateria: "",
            potencia: "",
            tipoCaixa: "",
            nPortas: ""
        }
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
    handlerMarcaChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            marca: evento.target.value
        });
    }
    handlerModeloChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            modelo: evento.target.value
        });
    }
    handlerVersaoChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            versao: evento.target.value
        });
    }
    handlerCombustivelChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            combustivel: evento.target.value
        });
    }
    handlerAnoChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            ano: evento.target.value
        });
    }
    handlerCilindradaouCapBateriaChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            cilindradaouCapBateria: evento.target.value
        });
    }
    handlerPotenciaChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            potencia: evento.target.value
        });
    }
    handlerTipoCaixaChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            tipoCaixa: evento.target.value
        });
    }
    handlerNportaChange = (evento) => {
        //guardar os dados recolhidos
        this.setState({
            nPortas: evento.target.value
        });
    }
    handlerFotoChange = (evento) => {
        //guardar os dados recolhidos 
        this.setState({
            foto: evento.target.files[0]
        });
    }
    handlerSubmitForm = (evento) => {
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();

        //prepração dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            Marca: this.state.marca,
            newfoto: this.state.foto,
            Modelo: this.state.modelo,
            Versao: this.state.versao,
            Combustivel: this.state.combustivel,
            Ano: this.state.ano,
            CilindradaouCapacidadeBateria: this.state.cilindradaouCapBateria,
            Potencia: this.state.potencia,
            TipoCaixa: this.state.tipoCaixa,
            Nportas: this.state.nPortas

        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosCarros(dadosFormulario);
    }

    render() {
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosCarros } = this.props;
        return (
            <div >
                <h1>Registo de um carro novo</h1>
                <form method="Post"
                    onSubmit={this.handlerSubmitForm}
                    encType="multipart/form-data"
                >
                    <div className="row">
                        <div className="col-md-4">
                            Marca: <input type="text"
                                required

                                value={this.state.marca}
                                onChange={this.handlerMarcaChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Modelo: <input type="text"
                                required
                                value={this.state.modelo}
                                onChange={this.handlerModeloChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Versao: <input type="text"
                                required
                                name="Versao"
                                value={this.state.versao}
                                onChange={this.handlerVersaoChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Foto: <input type="file"
                                required
                                accept=".jpg,.png,.JPG,.PNG"
                                onChange={this.handlerFotoChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Ano: <input type="text"
                                required
                                value={this.state.ano}
                                onChange={this.handlerAnoChange}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            Combustivel: <input type="text"
                                required
                                value={this.state.combustivel}
                                onChange={this.handlerCombustivelChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Cilindrada/CapacidadeBateria: <input type="text"
                                required
                                value={this.state.cilindradaouCapBateria}
                                onChange={this.handlerCilindradaouCapBateriaChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Potencia: <input type="text"
                                required
                                value={this.state.potencia}
                                onChange={this.handlerPotenciaChange}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            TipoCaixa: <input type="text"
                                required
                                value={this.state.tipoCaixa}
                                onChange={this.handlerTipoCaixaChange}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            Nportas: <input type="text"
                                required
                                value={this.state.nPortas}
                                onChange={this.handlerNportaChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                    </div>
                    <br></br>
                    <input type="submit"
                        value="Adicionar Carro"
                        className="btn btn-primary" />
                    <br />
                    <br />
                </form>
            </div>
        )
    }
}

export default Formulario;