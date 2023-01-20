import { useContext, useState } from "react";
import Checkbox from "../Components/checkbox";
import { Todo } from "../Interfaces/Interfaces";
import { PrimaryContext } from "../Hooks/primaryContext";
interface Props {
    todo: Todo;
    closeModal :()=>void
}
const EditView =({todo, closeModal}:Props)=>{
    const [form, setForm] = useState(todo);
    const {primaryData, setPrimaryData} = useContext(PrimaryContext);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
      e.preventDefault();
      fetch(`https://jsonplaceholder.typicode.com/posts/${form.userId}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        const idx =primaryData.findIndex((el:Todo) => el.id === form.id);
        const temp = [...primaryData];
        temp[idx] = form;             
        setPrimaryData(temp);
          closeModal();
        });
      
    }
    return (
      <form onSubmit={handleSubmit}>        
        <h1>UPDATE TODO</h1> 
        <br/>            
        <input type="text" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} />        
        <div className="edit-check"><Checkbox
         handleChange={(e)=>{setForm({...form, completed: e.target.checked})}}
         isChecked={form.completed}
         label="Complete"/>
         </div>
         <button type="submit">submit</button>
      </form>
    )
}

export default EditView