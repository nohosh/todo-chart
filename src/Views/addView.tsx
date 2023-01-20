import { useContext, useState } from "react";
import Checkbox from "../Components/checkbox";
import { PrimaryContext } from "../Hooks/primaryContext";
interface Props {    
    closeModal :()=>void
}
const AddTodoView =({closeModal}:Props)=>{
    const [form, setForm] = useState({     
        userId: '',        
        title: '',    
        completed: false
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const {primaryData, setPrimaryData} = useContext(PrimaryContext);

    const validate = () =>{
        let isError =false;
        let msg = ''
        if(form.userId===''){
            msg = 'Enter a valid userId';
            isError= true;
        }
        setIsError(isError);
        setErrorMsg(msg);
        return isError                
    }
    
    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        const DTO = {
          userId: form.userId,
          title: form.title,
          completed: form.completed
        }
        const isValid = !validate();
        if(isValid){
            fetch(`https://jsonplaceholder.typicode.com/posts/`, {
                method: 'POST',
                body: JSON.stringify(DTO),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
            .then((response) => response.json())
            .then((json) => {
              
              console.log(json);
                const temp = [...primaryData];                                
                temp.push({
                  ...json, userId: Number(form.userId)
                });
                setPrimaryData(temp);        
                closeModal();
              });
        }          
    }
    
    return (
      <form onSubmit={handleSubmit}>        
        <h1>ADD TODO</h1>
        <input type="number" placeholder="user id" value={form.userId} onChange={(e)=>setForm({...form, userId: e.target.value})} />
        <input type="text" placeholder="title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} />        
        <div className="add-checkBox">
            <Checkbox
                handleChange={(e)=>{setForm({...form, completed: e.target.checked})}}
                isChecked={form.completed}
                label="Status"/>
         </div>
         <button type="submit">Add</button>
         {isError ? <span className="error">{errorMsg}</span>: null}
      </form>
    )
}

export default AddTodoView