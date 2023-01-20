import { Todo } from "../Interfaces/Interfaces";
import "./styles/styles.scss";
interface Props {
    props?: Todo;  
    hideModal: ()=>void;
    Component: any  
}

const ModalHOC = ({hideModal, Component, props}: Props) => {    
  return (
    <div className="modal">        
        <button onClick={hideModal}>❌</button>
        <Component closeModal={hideModal}todo={props}/>
    </div>
  );
};

export default ModalHOC;
