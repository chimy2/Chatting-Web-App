import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../image/icon.png';
import { Cookies, useCookies }  from 'react-cookie';

function Login(props) {
  const { cookies, setCookie } = useCookies(['id']);
  useEffect(() => {
    if(cookies !== undefined){
      setCookie(cookies[0].id);
      console.log(cookies);
    }
  }, [cookies]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.id.value,
        password: e.target.password.value
      })
    })
      .then(res => res.json())
      .then(res => {
        // console.log(cookies[0].id);
      console.log(cookies);
        // if(res.body === 0) {
        //   alert('로그인 실패');
        //   setCookie('name', newName, { path: '/' });
        // }else if(res.body === 1) {
        //   console.log(cookie.get('id'));
        //   console.log(cookie);
        //   alert('로그인 성공');
        // }
      });
  };

  return(
    <div className="login">
      <Link to="/"><img className="mainLogo" src={logo} alt="메인화면"/></Link>
      <form onSubmit={handleLogin}>
        <input type="text" name="id" placeholder="아이디"/>
        <span></span>
        <input type="password" name="password" placeholder="비밀번호"/>
        <span></span>
        <button type="submit">로그인</button>
      </form>
      <Link to="findInfo">아이디/비밀번호 찾기</Link>
    </div>
  )
}

export default Login;