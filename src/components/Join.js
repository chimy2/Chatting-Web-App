import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/icon.png';
import { useHistory } from "react-router-dom";

function Join() {
  let history = useHistory();
  // const [ id, setId ] = useState();
  // const [ pw1, setPw1 ] = useState();
  // const [ pw2, setPw2 ] = useState();
  // const [ name, setName ] = useState();
  // const [ year, setYear ] = useState();
  // const [ month, setMonth ] = useState();
  // const [ day, setDay ] = useState();
  // const [ email, setEmail ] = useState();
  // const [ phone, setPhone ] = useState();

  const handleCheck = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const next = e.target.nextSibling;
    if(value === '') return;
    next.innerHTML = '';
    if(name === 'id' || name === 'email' || name === 'phone'){
      let regex;
      next.innerHTML = '';
      switch(name){
        case 'id':
          if(value.length < 4 || value.length > 15) {
            next.innerHTML = '아이디는 4글자 이상 15글자 이하 입니다';
            return;
          }else if(false) {

          }
          regex = /[0-9!]/g;
          console.log(regex.test(value));
          break;
        case 'email':
          if(value.length > 45) {
            next.innerHTML = '다른 이메일 주소를 이용해주세요';
          }else if(true) {

          }
          break;
        case 'phone':
          
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
        .then(console.log);
    } else {
      const before = e.target.previousSibling.previousSibling;
      switch(name){
        case 'password':
          if(value.length < 6 || value.length > 20) {
            console.log(value.length);
            next.innerHTML = '패스워드는 6글자 이상 20글자 이하 입니다';
          }
          break;
        case 'password2':
          if(value !== before.value){
            next.innerHTML = '패스워드가 일치하지 않습니다';
          }
          break;
      }
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    fetch('/api/member/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.id.value,
        password: e.target.password.value,
        name: e.target.name.value,
        birth: e.target.year.value+'-'+e.target.month.value+'-'+e.target.day.value,
        email: e.target.email.value,
        phone: e.target.phone.value
      })
    })
    .then(res => {
        if(res.status === 201){
          history.push('./');
        }
      });
  };

  return(
    <div className="join">
      <Link to="/"><img className="mainLogo" src={logo} alt="메인화면"/></Link>
      <form onSubmit={handleJoin} onKeyUp={handleCheck}>      
      {/* <form onSubmit={handleJoin} onClick={handleClick} ref={textInput}>       */}
        <input type="text" name="id" placeholder="아이디"/>
        <span/>
        <input type="password" name="password" placeholder="비밀번호"/>
        <span/>
        <input type="password" name="password2" placeholder="비밀번호 확인"/>
        <span/>
        <input type="text" name="name" placeholder="이름"/>        
        <span/>
        <div className="birth">
          <input type="text" name="year" placeholder="생년(4자리)"/>        
          <select type="text" name="month">
            <option value="월">월</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>        
          <input type="text" name="day" placeholder="일"/>   
        </div>     
        <span/>
        <input type="text" name="email" placeholder="이메일"/>
        <span/>
        <input type="text" name="phone" placeholder="전화번호"/>
        <span/>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default Join;