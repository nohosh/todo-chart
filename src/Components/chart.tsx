
import { useEffect, useState } from "react";
import { Todo } from "../Interfaces/Interfaces";
import { Bar } from "react-chartjs-2";
import {GCT} from "../Utils/charUtils"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface Props {
    filtered: boolean
    data:  Todo[];
}

const Chart = ({filtered, data}:Props) => {                   
    const [local, setLocal] = useState<any>(GCT(data,filtered));   

    useEffect(()=>{
        setLocal(GCT(data,filtered));
    },[data,filtered]);

    return (
    <div className="chart-container">          
        <Bar data={local[0]} 
        options={local[1]}
      />
    </div>
    );
}
export default Chart