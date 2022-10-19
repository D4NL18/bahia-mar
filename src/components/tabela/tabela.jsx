import { useState } from "react"

import SearchIcon from '@mui/icons-material/Search';

export default function App(props) {

    const [value, setValue] = useState('')
    const [dataSource, setDataSource] = useState(props.tableData)
    const [tableFilter, setTableFilter] = useState([])

    const filterData = (e) => {
        if (e.target.value !== "") {
            setValue(e.target.value)
            const filterTable = dataSource.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
            setTableFilter([...filterTable])
        } else {
            setValue(e.target.value)
            setDataSource([...dataSource])
        }
    }

    function VerificaTipo(tipo) {
        if (tipo === "vendas") {
            return (
                value.length > 0 ? tableFilter.map((data) => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.vendedor}</td>
                            <td>{data.cliente}</td>
                            <td>{data.faturamento}</td>
                        </tr>
                    )
                })
                    :
                    dataSource.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.vendedor}</td>
                                <td>{data.cliente}</td>
                                <td>{data.faturamento}</td>
                            </tr>
                        )
                    })
            )
        }
        else if (tipo === "estoque") {
            return (
                value.length > 0 ? tableFilter.map((data) => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.nome}</td>
                            <td>{data.ultimaCompra}</td>
                            <td>{data.disponivel}</td>
                            <td>{data.faturamento}</td>
                        </tr>
                    )
                })
                    :
                    dataSource.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.nome}</td>
                                <td>{data.ultimaCompra}</td>
                                <td>{data.disponivel}</td>
                                <td>{data.faturamento}</td>
                            </tr>
                        )
                    })
            )
        }
        else if (tipo === "precos") {
            return (
                value.length > 0 ? tableFilter.map((data) => {
                    return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.produto}</td>
                            <td>{data.preco.toFixed(2)}</td>
                            <td>{((data.preco) * 0.95).toFixed(2)}</td>
                            <td>{((data.preco) * 0.9).toFixed(2)}</td>
                            <td>{((data.preco) * 0.85).toFixed(2)}</td>
                            <td>{((data.preco) * 0.8).toFixed(2)}</td>
                        </tr>
                    )
                })
                    :
                    dataSource.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.produto}</td>
                                <td>{data.preco.toFixed(2)}</td>
                                <td>{((data.preco) * 0.95).toFixed(2)}</td>
                                <td>{((data.preco) * 0.9).toFixed(2)}</td>
                                <td>{((data.preco) * 0.85).toFixed(2)}</td>
                                <td>{((data.preco) * 0.8).toFixed(2)}</td>
                            </tr>
                        )
                    })
            )
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><SearchIcon></SearchIcon></span>
                <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Username" aria-describedby="basic-addon1" value={value} onChange={filterData} />
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        {
                            props.colunas.map((col, key) => {
                                return (
                                    <th scope="col" key={key}>{col}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        VerificaTipo(props.tipo)
                    }
                </tbody>
            </table>
        </div>
    )
}