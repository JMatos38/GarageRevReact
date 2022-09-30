// Tabela.js
// ****************************************************** 

import React from 'react'
import Table from 'react-bootstrap/Table';

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>

                <th style={{ textAlign: 'center' }}>Marca</th>
                <th style={{ textAlign: 'center' }}>Modelo</th>
                <th style={{ textAlign: 'center' }}>Versao</th>
                <th style={{ textAlign: 'center' }}>Combustivel</th>
                <th style={{ textAlign: 'center' }}>Ano</th>
                <th style={{ textAlign: 'center' }}>Cilindrada/ Bateria</th>
                <th style={{ textAlign: 'center' }}>Potencia</th>
                <th style={{ textAlign: 'center' }}>Caixa</th>
                <th style={{ textAlign: 'center' }}>Numero de Portas</th>
                <th style={{ textAlign: 'center' }}>Foto</th>
                <th style={{ textAlign: 'center' }}></th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosCarros'

    const rows = props.dadosDosCarros.map((row) => {
        return (
            <tr key={row.id}>
                <td style={{ textAlign: 'center' }} >{row.marca}</td>
                <td style={{ textAlign: 'center' }}>{row.modelo}</td>
                <td style={{ textAlign: 'center' }}>{row.versao}</td>
                <td style={{ textAlign: 'center' }}>{row.combustivel}</td>
                <td style={{ textAlign: 'center' }}>{row.ano}</td>
                <td style={{ textAlign: 'center' }}>{row.cilindradaouCapacidadeBateria}</td>
                <td style={{ textAlign: 'center' }}>{row.potencia} cv</td>
                <td style={{ textAlign: 'center' }}>{row.tipoCaixa}</td>
                <td style={{ textAlign: 'center' }}>{row.nportas}</td>
                <td style={{ textAlign: 'center' }}><img src={'https://localhost:7054/Photos/' + row.foto}
                    alt={'foto do ' + row.marca}
                    height="150" width="120" />
                </td>
                <td style={{ textAlign: 'center' }}>
                    <button type="button" 
                    className="btn btn-outline-danger btn-rounded" 
                    onClick={() => props.CarroAremover(row)}>Eliminar</button>
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
        const { inDadosCarros, carro } = this.props

        return (
            <table>
                <CabecalhoTabela />
                {/* o parâmetro 'dadosCarro' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosCarros={inDadosCarros} 
                CarroAremover={carro} />
            </table>
        );
    }
}


export default Tabela
