import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/icon.png';
import { useHistory } from 'react-router-dom';

function Join() {
  let history = useHistory();

  const handleCheck = (e) => {
    const now = e.target;
    const name = now.name;
    const value = now.value;
    const len = value.length;
    const next = now.nextSibling;
    if(value === '') return;
    if(name !== 'year' && name !== 'day') {
      next.innerHTML = '';
    }
    if(name === 'id' || name === 'email' || name === 'phone'){
      let regex;
      switch(name){
        case 'id':
          if(len < 4 || len > 15) {
            next.innerHTML = '아이디는 4글자 이상 15글자 이하 입니다';
            return;
          }
          // regex = /[0-9!]/g;
          // console.log(regex.test(value));
          break;
        case 'email':
          if(len > 45) {
            next.innerHTML = '다른 이메일 주소를 입력해주세요';
          }
          break;
        case 'phone':
          if(len > 15) {
            next.innerHTML = '유효한 핸드폰 번호를 입력해주세요'
          }
          break;
        default:
      }
      fetch('/api/member/check', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          value: value
        })
      })
        .then(res => res.json())
        .then(res => {
          if(res.num > 0) {
            next.innerHTML = `이미 존재하는 ${name !== 'phone' ? name : '핸드폰 번호'}입니다`;
          }
        });
    } else {
      switch(name){
        case 'password':
        case 'password2':
          const formNode = now.parentNode.childNodes;
          const password = formNode[2];
          const password2 = formNode[3];
          const passwordSpan = formNode[4];
          passwordSpan.innerHTML = '';
          if(len < 6 || len > 20) {
            passwordSpan.innerHTML = '패스워드는 6글자 이상 20글자 이하 입니다';
          } else if(password.value !== password2.value) {
            passwordSpan.innerHTML = '패스워드가 일치하지 않습니다';
          }
          break;
        case 'name':
          if(len > 15) {
            next.innerHTML = '15글자 이내로 입력해주세요';
          }
          break;
        default:
          const nextSpan = now.parentElement.nextSibling;
          const birth = now.parentNode.childNodes;
          const year = birth[0].value;
          const month = birth[1].value;
          const day = birth[2].value;
          nextSpan.innerHTML = '';
          if(name === 'year' && len !== 4) {
            nextSpan.innerHTML = '생년은 4자리로 입력해주세요';
          } else {
            if(year.length === 4 && month !== '월' && day !== '') {
              const current = new Date();
              const input = new Date(`${year}-${month}-${day}`);
              const old = new Date('1886-6-25');

              if(!input.getYear()) {
                nextSpan.innerHTML = '유효한 날짜가 아닙니다';
              } else if(input < old) {
                nextSpan.innerHTML = '과거에서 오셨나요?';
              } else if(input > current) {
                nextSpan.innerHTML = '미래에서 오셨나요?';
              }
            } 
          }
      }
    }
  };

  const handleJoin = (e) => {
    const now = e.target;
    let num = 0;
    e.preventDefault();
    
    // 유효 데이터 체크
    for(let i=1;i<now.childNodes.length-1;i+=2){
      if(now.childNodes[i].innerText !== ''){
        num = 2;
        break;
      }
      if(i === 1) i++;
    }
    
    // 빈칸 체크
    for(let i=0;i<now.length-1;i++){
      if((i === 5 && now[5].value === '월') || now[i].value === '') {
        num = 1;
        break;
      }
    }
    
    if(num === 1) {
      alert('빈칸을 채워주세요');
    } else if(num === 2) {
      alert('빈칸에 알맞은 정보를 입력해주세요');
    } else {
      fetch('/api/member/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: now.id.value,
          password: now.password.value,
          name: now.name.value,
          birth: now.year.value+'-'+now.month.value+'-'+now.day.value,
          email: now.email.value,
          phone: now.phone.value
        })
      })
      .then(res => {
          if(res.status === 201) {
            history.push('./');
          }
        });
    }
  };

  return(
    <div className='join'>
      <Link to='/'><img className='mainLogo' src={logo} alt='메인화면'/></Link>
      {/* <form onSubmit={handleJoin} onKeyUp={handleCheck}>       */}
      <form onSubmit={handleJoin} onChange={handleCheck}>      
        <input type='text' name='id' placeholder='아이디'/>
        <span/>
        <input type='password' name='password' placeholder='비밀번호'/>
        <input type='password' name='password2' placeholder='비밀번호 확인'/>
        <span/>
        <input type='text' name='name' placeholder='이름'/>        
        <span/>
        <div className='birth'>
          <input type='text' name='year' placeholder='생년(4자리)' maxLength='4'/>        
          <select type='text' name='month'>
            <option value='월'>월</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
          </select>        
          <input type='text' name='day' placeholder='일' maxLength='2'/>   
        </div>     
        <span/>
        <input type='text' name='email' placeholder='이메일'/>
        <span/>
        <input type='text' name='phone' placeholder='전화번호'/>
        <span/>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default Join;