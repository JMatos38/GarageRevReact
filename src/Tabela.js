// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                
                <th style={{textAlign:'center'}}>Marca</th>
                <th style={{textAlign:'center'}}>Modelo</th>
                <th style={{textAlign:'center'}}>Versao</th>
                <th style={{textAlign:'center'}}>Foto</th>
                <th style={{textAlign:'center'}}>Ano</th>
                <th style={{textAlign:'center'}}>Combustivel</th>
                <th style={{textAlign:'center'}}>cilindrada/Cap.Bateria</th>
                <th style={{textAlign:'center'}}>Potencia</th>
                <th style={{textAlign:'center'}}>Tipo de Caixa</th>
                <th style={{textAlign:'center'}}>Numero de Portas</th>
                <th style={{textAlign:'center'}}></th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosFilmes'
    const rows = props.dadosDosCarros.map((row) => {
        return (
            <tr key={row.idCarros}>
                {/* <td>{row.idFilmes}</td> */}
                <td style={{textAlign:'center'}}><br></br><br></br>{row.titulo}</td>
                <td style={{textAlign:'center'}}><img src={'fotos/' + row.capa}
                    alt={'foto do ' + row.foto}
                    height="150" width="120"/>
                </td>
                <td style={{textAlign: 'justify'}}><br></br><br></br>{row.descricao}</td>
                <td style={{textAlign:'center'}}><br></br><br></br>{row.realizador}</td>
                <td style={{textAlign:'center'}}><br></br><br></br>{row.elenco}</td>
                <td style={{textAlign:'center'}}><br></br><br></br>{row.duracao}</td>
                <td style={{textAlign:'center'}}><br></br><br></br>{row.pontuacao}</td>
                <td style={{textAlign:'center'}}>
                <br></br><br></br>
                <a href={row.link}>
                    <img src="fotos/linke.png"
                    alt={row.link}
                    height="40" width="40"/>
                </a>
                </td>
                <td style={{textAlign:'center'}}>
                <br></br><br></br>
                <button className="btn btn-danger" onClick={()=>props.filmeAremover(row)}>Eliminar</button>
                </td>
            </tr>

        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { inDadosFilmes, filmes } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosfilmes' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosFilmes={inDadosFilmes} filmeAremover={filmes} />
            </table>
        );
    }
}


export default Tabela