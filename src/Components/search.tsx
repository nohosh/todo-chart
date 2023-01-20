
import { ChangeEvent } from "react";

interface Props{
    handleFilter: (input:string)=>void;
}

const Search = ({handleFilter}:Props) => {             
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {      
      handleFilter(e.target.value)   
    };

    return (        
        <div className="filter-search">
            <label htmlFor="filterInput">🔎</label>
            <input
                type="text"
                placeholder="search by title..."
                name="task"
                id="filterInput"            
                onChange={handleChange}/>    
        </div>
    );
}
export default Search