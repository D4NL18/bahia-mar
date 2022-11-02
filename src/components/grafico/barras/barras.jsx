import React from 'react'

import { Bar,  } from 'react-chartjs-2'
import { Chart as Chart } from 'chart.js/auto'


function Barras(props) {

    return <Bar
        data={props.chartData}
        options={{
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false,
        }}
    />

}

export default Barras