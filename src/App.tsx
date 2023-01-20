import { FC,useEffect,useMemo,useState } from 'react';
import { Todo } from "./Interfaces/Interfaces";
import './App.css';
import TodoDashboard from './Views/TodoDashboard';
import { PrimaryContext } from "./Hooks/primaryContext";

const App: FC = ()=> {
  //fetching just once: as the data is same everytime. Also, to persist the changing data state [add, update, delete] 
  const [primaryData, setPrimaryData] = useState<Todo[]>();  
  const value = useMemo(() => ({ primaryData, setPrimaryData }), [primaryData, setPrimaryData]);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => setPrimaryData(json));    
  },[]);

  useEffect(()=>{
    console.log('more',primaryData)
  }, [primaryData])
  
  return (
    <div className="App">      
      <PrimaryContext.Provider value={value}>
        <TodoDashboard data={primaryData}/>          
      </PrimaryContext.Provider>         
    </div>
  );
};

export default App;
