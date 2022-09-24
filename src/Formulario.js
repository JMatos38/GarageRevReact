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
    handleAdd = (event) => {
        // read the data available at 'event'
        const { name, value } = event.target
        // assign to the state identified by 'name' withe the 'value' writed by user
        this.setState({
            [name]: value,
        })
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
            UpFotografia: this.state.foto,
            Modelo: this.state.modelo,
            Versao: this.state.versao,
            Combustivel: this.state.combustivel,
            Ano: this.state.ano,
            CilindradaouCapBateria: this.state.cilindradaouCapBateria,
            Potencia: this.state.potencia,
            TipoCaixa: this.state.tipoCaixa,
            Nportas: this.state.nPortas

        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosnovo(dadosFormulario);
    }

    render() {
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosCarros } = this.props;
        const { Marca, Modelo, Versao, Combustivel
            , Ano, Potencia, TipoCaixa, Nportas, CilindradaouCapBateria } = this.state;


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
                                name="Marca"
                                value={carroMarca}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Modelo: <input type="text"
                                required
                                name="Modelo"
                                value={carroModelo}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Versao: <input type="text"
                                required
                                name="Versao"
                                value={carroVersao}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Foto: <input type="file"
                                required
                                name="Foto"
                                accept=".jpg,.png,.JPG,.PNG"
                                onChange={this.handlerFotoChange}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Ano: <input type="text"
                                required
                                name="Ano"
                                value={Ano}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            Combustivel: <input type="text"
                                required
                                name="Combustivel"
                                value={Combustivel}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Cilindrada/CapacidadeBateria: <input type="text"
                                required
                                name
                                value={CilindradaouCapBateria}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br />
                        </div>
                        <div className="col-md-4">
                            Potencia: <input type="text"
                                required
                                name="Potencia"
                                value={Potencia}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            TipoCaixa: <input type="text"
                                required
                                name="TipoCaixa"
                                value={TipoCaixa}
                                onChange={this.handleAdd}
                                className="form-control btn btn-outline-secondary" /><br /><br />
                        </div>
                        <div className="col-md-4">
                            Nportas: <input type="text"
                                required
                                name="Nportas"
                                value={Nportas}
                                onChange={this.handleAdd}
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