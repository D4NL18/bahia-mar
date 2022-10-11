import { useState } from "react"

export default function App(props) {



    const [value, setValue] = useState('')
    const [dataSource, setDataSource] = useState(props.tableData)
    const [tableFilter, setTableFilter] = useState([])

    const filterData = (e) => {
        if(e.target.value !== "") {
            setValue(e.target.value)
            const filterTable = dataSource.filter(o=>Object.keys(o).some(k=> String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
            setTableFilter([...filterTable])
        }else {
            setValue(e.target.value)
            setDataSource([...dataSource])
        }
    }

    return (
        <div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Username" aria-describedby="basic-addon1" value={value} onChange={filterData} />
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Faturamento</th>
                    </tr>
                </thead>
                <tbody>
                    { value.length > 0 ? tableFilter.map((data) => {
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
                    }
                </tbody>
            </table>
        </div>
    )
}