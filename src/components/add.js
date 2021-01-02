import { useState, useEffect } from 'react';
import List from './List';
import close from '../image/close.png';
import search from '../image/search.png';
import add from '../image/add.png';

function Add(props) {
  const [state, setState] = useState('overlay-close');
  const addClose = () => {
    if(document.location.pathname === '/') {
      props.setAddState({
        addState: false
      });
      document.querySelector('.addContent > form > input').value='';
    }else {
      props.setAddState(false);
    }
    setState('overlay-close');
  }
  
  useEffect(()=>{
      if(props.open){
          setState('overlay-open');
      }
  }, [props.open]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return(
    <div className={state}>
      <div className="add">
        <div className="addTitle">
          {props.title}
          <span onClick={addClose}>
              <img src={close} alt="close"/>
          </span>
        </div>
        {
          document.location.pathname !== '/talk' ?
            <div className="addContent">
              <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder={props.placeholder}/>
                <button type="submit">
                  {
                    document.location.pathname === '/note' ?
                      <img src={add} alt="add"/>
                      : <img src={search} alt="search"/>
                  }
                </button>
              </form>
            </div>
            : ""
        }
        <div className="addList">
          <List state={''} add={'22'}/>
          <List state={''} add={'22'}/>
          <List state={''} add={'22'}/>
          <List state={''} add={'22'}/>
        </div>
      </div>
    </div>
  )
}

export default Add;