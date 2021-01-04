import { useState, useEffect } from 'react';
import List from './List';
import close from '../image/close.png';
import search from '../image/search.png';
import add from '../image/add.png';

function Add(props) {
  const [overlay, setOverlay] = useState('overlay-close');
  const [friendSearch, setFriendSearch] = useState();
  const addClose = () => {
    if(document.location.pathname === '/') {
      props.setAddState({
        addState: false
      });
      document.querySelector('.addMainTitle > form > input').value='';
    }else {
      props.setAddState(false);
    }
    setOverlay('overlay-close');
  }
  
  useEffect(()=>{
      if(props.open){
        setOverlay('overlay-open');
      }
  }, [props.open]);

  const handleFormSubmit = (e) => {
    const path = document.location.pathname;
    const value = e.target[0].value;
    
    e.preventDefault();
    if(path === '/'){
      if(value.length < 4) {
        alert('4글자 이상 입력해주세요');
      } else {
        callApi('/friend/search', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify({
            search: value
          })
        })
          .then(res => res[0])
          .then(res => {
            if(res.num !== 0) {
              setFriendSearch(res);
            } else {
              setFriendSearch();
              alert('찾는 친구의 정보가 없습니다');
            }
          });
      }
    }
  };

  const callApi = async (address, content) => {
    const response = await fetch(`/api${address}`, content);
    const body = await response.json();
    return body;
  }


  return(
    <div className={overlay}>
      <div className="add">
        <div className="addTitle">
          {props.title}
          <span onClick={addClose}>
              <img src={close} alt="close"/>
          </span>
        </div>
        {
          document.location.pathname !== '/talk' ?
            <div className="addMainTitle">
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
        <div className="addMainContent">
          {
            friendSearch ? 
              <List state={friendSearch} add={'22'}/> : ""
          }
        </div>
      </div>
    </div>
  )
}

export default Add;