import { useState,useContext } from "react";
import { Todo } from "../Interfaces/Interfaces";
import { PrimaryContext } from "../Hooks/primaryContext";
interface Props {
    todo: Todo;
    closeModal :()=>void
}
const DeleteView =({todo, closeModal}:Props)=>{
    const [form,] = useState(todo);
    const {primaryData, setPrimaryData} = useContext(PrimaryContext);
    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){      
      e.preventDefault();
      fetch(`https://jsonplaceholder.typicode.com/posts/${form.id}`,{
            method: 'DELETE',          
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
      })
      .then((response) => response.json())
      .then((json) => {                    
          const idx =primaryData.findIndex((el:Todo) => el.id === form.id);
          const temp = [...primaryData];
          temp.splice(idx,1);              
          setPrimaryData(temp);
          closeModal();
        });
      
    }
    return (
      <form onSubmit={handleSubmit}>        
        <h2>Are you sure? </h2>                
        <p><b>Title: </b>{todo.title}</p>
        <p><b>Status: </b> {todo.completed ? "✅": "🏋️"}</p>
         <button type="submit">🗑️</button>
      </form>
    )
}

export default DeleteView