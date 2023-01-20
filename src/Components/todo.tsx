import { Todo } from "../Interfaces/Interfaces";
import Table from "../Components/list";
import Search from "../Components/search";
import { useEffect, useState } from "react";

interface Props {
  data: Todo[];  
}

const TodoTable = ({ data }: Props) => {
  const [filterSeach, setFilterSeach] = useState(data);
  const [searchTerm,setSearchTerm] = useState('');
  
  const handleFilter=(str: string):void=>{        
    let copy = data;
    if(str.length) copy = copy?.filter(el=>el.title.toLowerCase().includes(str.toLocaleLowerCase()));      
    setFilterSeach(copy);   
    setSearchTerm(str);
  }
  
  // eslint-disable-next-line 
  useEffect(()=>handleFilter(searchTerm), [data]);

  return (
    <div className="todo-section">
      <Search handleFilter={handleFilter}/>
      <Table data={filterSeach}/>
    </div>
  );
};

export default TodoTable;
