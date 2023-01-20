import { useState } from "react";
import { Todo } from "../Interfaces/Interfaces";
import Chart from "../Components/chart";
import TodoTable from "../Components/todo";
interface Props{
    data: Todo[]| undefined;
    filtered: boolean;
}
const RenderTodo = ({data, filtered}:Props) => {     
    const [isChart, setIsChart] = useState(false);
    
    const toggleView =()=>{
        setIsChart(!isChart);
    }
   
    return (
        <div className="todo-app">                                    
            <button className="btn-toggle" onClick={toggleView}>Toggle View</button>
            {data ? isChart ? <Chart filtered={filtered} data={data}/>:<TodoTable data={data}/>:"404"}
        </div>    
    );
};

export default RenderTodo;
