import { useEffect, useState } from "react";
import { Todo } from "../Interfaces/Interfaces";
import Filter from "../Components/filter";

import RenderTodo from "../Containers/RenderTodo";

interface Props{
  data: Todo[] | undefined;
}

const TodoDashboard = ({data}: Props) => {      
    const [filteredData, setFilteredData] = useState(data);
    const [isFiltered, setIsFiltered] = useState(false);    
    const filteredUser = (userId:number, data:Todo[]|undefined)=>{            
      return data?.filter(el=> el.userId===userId);
    }

    const filterComplete = (data:Todo[]| undefined)=>{      
      return data?.filter(el=> el.completed===true);
    }

    const handleFilter=(userId:number, complete: boolean)=>{
      let copy = data;
      let isFilter = false;
      if(userId > 0){
        copy = filteredUser(userId, copy);
        isFilter =true;
      }
      if(complete) {
        copy = filterComplete(copy)
        isFilter =true;
      }
      setFilteredData(copy);
      setIsFiltered(isFilter);
    }

    useEffect(()=>{
      setFilteredData(data);
    },[data])

  return (
    <div className="todo-app">   
       <h1>TODO </h1>
        <Filter handleFilter={handleFilter} />        
        {filteredData ? <RenderTodo filtered={isFiltered} data={filteredData}/> : 404}
    </div>    
  );
};

export default TodoDashboard;
