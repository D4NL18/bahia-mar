import { useState } from "react"

export default function App() {

    const tableData = [
        { id: 1, firstName: 'Daniel', lastName: 'Marinho', email: 'danielmarinho8@hotmail.com' },
        { id: 2, firstName: 'André', lastName: 'Marinho', email: 'andremarinho8@hotmail.com' },
    ]

    const [value, setValue] = useState('')
    const [dataSource, setDataSource] = useState(tableData)
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
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    { value.length > 0 ? tableFilter.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                            </tr>
                        )
                    })
                    :
                    dataSource.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}