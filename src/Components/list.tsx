
import { useMemo, useState } from "react";
import { Todo } from "../Interfaces/Interfaces";
import Pagination from "../Components/Pagination";
import ModalHOC from "../Components/Modal";
import "./styles/styles.scss";
import EditView from "../Views/editView";
import DeleteView from "../Views/deleteView";
import AddTodoView from "../Views/addView";

interface Props {
    data: Todo[]| undefined;
  }

enum  Modal{
   Edit,
   Delete,
   Add
  }

const Table = ({data}: Props) => {        
    const pageSize = 10;      
    const [currentPage, setCurrentPage] = useState<number>(1);       
    const [showModal, setShowModal] = useState(false);     
    const [currModal, setCurrModal] = useState(Modal.Edit);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data?.slice(firstPageIndex, lastPageIndex);
    }, [data, currentPage]);

    const  [currentTodo, setCurrentTodo]= useState<Todo>();

    const editItem = (item: Todo, key:number, currentPage: number)=>{
        console.log('edit item', item, key, currentPage);        
        setCurrModal(Modal.Edit);
        setCurrentTodo(item);
        setShowModal(true);            
    }

    const deleteItem = (item: Todo, key:number, currentPage: number)=>{
      console.log('delete item', item, key, currentPage);      
      setCurrModal(Modal.Delete);
      setCurrentTodo(item);
      setShowModal(true);        
    }

    const handleAddButton = ()=>{
      setCurrModal(Modal.Add);
      setShowModal(true);
    }

    const RenderModal=(props:any)=>{
      const {modalType} = props;

      switch (modalType){
        case Modal.Edit:      
             return currentTodo && showModal? <ModalHOC props={currentTodo} Component={EditView} hideModal={hideModal}/>: null;                    
        case Modal.Delete:
            return currentTodo && showModal? <ModalHOC props={currentTodo} Component={DeleteView} hideModal={hideModal}/>: null;   
        case Modal.Add:
            return showModal ? <ModalHOC Component={AddTodoView} hideModal={hideModal}/>: null;   
        default: 
          return <>Something went wrong with modal</>
      }
    }   

    const hideModal = () =>{
      setShowModal(false);
    }    
    
  return (
    <>
      <RenderModal modalType={currModal}/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData?.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.completed? "✅": "🏋️"}</td>
                <td className="table-buttons">
                    <button onClick={()=>editItem(item, key, currentPage)}>📝</button>
                    <button onClick={()=>deleteItem(item, key, currentPage)}>🗑️ </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add-todo"><button onClick={handleAddButton}>+</button></div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data?.length|| 1}
        pageSize={pageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />      
    </>

  )}
    
export default Table