import { useState, useEffect } from 'react';
import close from '../image/close.png';

function Add(props) {
  const [state, setState] = useState('overlay-close');
  const addClose = () => {
    props.setAddState({
      addState: false
    });
    setState('overlay-close');
  }
  
  useEffect(()=>{
      if(props.open){
          setState('overlay-open');
      }
  }, [props.open]);
  
  return(
    <div className={state}>
      <div className="add">
        <div className="addTitle">
          {'친구추가'}
          <span onClick={addClose}>
              <img src={close} alt="close"/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Add;