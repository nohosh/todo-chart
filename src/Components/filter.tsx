
import React, {  ChangeEvent, useState } from "react";
import Checkbox from "./checkbox";

interface Props{
    handleFilter: (input:number, complete: boolean)=>void;
}

const Filter = ({handleFilter}:Props) => {         
    const [filterInput, setFilterInput] = useState<number>(0);      
    const [isComplete, setIsComplete] = useState(false);

    const handleChangeComplete = (e: React.ChangeEvent<HTMLInputElement>) => {        
        setIsComplete(e.target.checked);
        handleFilter(filterInput, e.target.checked);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value= Number(e.target.value);
        setFilterInput(value);   
        handleFilter(value, isComplete);     
    };
    
    return (
        
    <div className="filter">
        <label htmlFor="filterInput">Filter:</label>
        <input
            type="number"
            placeholder="user ID..."
            name="task"
            id="filterInput"
            value={filterInput}
            onChange={handleChange}/>
        <Checkbox
         handleChange={handleChangeComplete}
         isChecked={isComplete}
         label="Complete"/>
    </div>

    );
}
export default Filter