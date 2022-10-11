import React from 'react'

import { Line } from 'react-chartjs-2'
import {Chart as Chart} from 'chart.js/auto'

function Linha(props) {
    return <Line data={props.chartData} />
}

export default Linha