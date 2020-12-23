import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/icon.png';
import { useHistory } from "react-router-dom";

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
          }else if(false) {

          }
          regex = /[0-9!]/g;
          console.log(regex.test(value));
          break;
        case 'email':
          if(len > 45) {
            next.innerHTML = '다른 이메일 주소를 입력해주세요';
          }else if(true) {

          }
          break;
        case 'phone':
          if(len > 15) {
            next.innerHTML = '유효한 핸드폰 번호를 입력해주세요'
          }
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
          if(len < 6 || len > 20) {
            next.innerHTML = '패스워드는 6글자 이상 20글자 이하 입니다';
          }
          break;
        case 'password2':
          const before = now.previousSibling.previousSibling;
          if(len < 6 || len > 20) {
            next.innerHTML = '패스워드는 6글자 이상 20글자 이하 입니다';
          } else if(value !== before.value){
            next.innerHTML = '패스워드가 일치하지 않습니다';
          }
          break;
        case 'name':
          if(len > 15) {
            next.innerHTML = '15글자 이내로 입력해주세요';
          }
          break;
        case 'year':
          const nextSpan = now.parentElement.nextSibling;
          nextSpan.innerHTML = '';
          if(len !== 4) {
            nextSpan.innerHTML = '생년은 4자리로 입력해주세요';
            
          }
          break;
      }
    }
  };

  const handleJoin = (e) => {
    const now = e.target;
    let num = 0;
    e.preventDefault();
    console.log(e.target);
    // 빈칸 체크
    for(let i=0;i<now.length-1;i++){
      if(i === 5 && now[5] === "월" || now[i].value === "") {
        num++;
        break;
      }
    }
    
    // 유효 데이터 체크
    for(let i=1;i<now.childNodes.length-1;i+=2){
      if(now.childNodes[i].innerText !== ''){
        num++;
        break;
      }
    }
    console.log(num);
    // if(num )
    // fetch('/api/member/join', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     id: now.id.value,
    //     password: now.password.value,
    //     name: now.name.value,
    //     birth: now.year.value+'-'+now.month.value+'-'+now.day.value,
    //     email: now.email.value,
    //     phone: now.phone.value
    //   })
    // })
    // .then(res => {
    //     if(res.status === 201){
    //       history.push('./');
    //     }
    //   });
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