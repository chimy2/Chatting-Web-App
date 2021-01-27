import { Link, useHistory } from "react-router-dom";

import logo from "../image/icon.png";

function Login(props) {
  let history = useHistory();

  const handleCheck = (e) => {
    const now = e.target ? e.target : e;
    const name = now.name;
    const value = now.value;
    const len = value.length;
    const next = now.nextSibling;
    next.innerHTML = "";
    if (value === "") return;
    switch (name) {
      case "id":
        if (len < 4 || len > 15) {
          next.innerHTML = "아이디는 4글자 이상 15글자 이하 입니다";
        }
        break;
      case "password":
        if (len < 6 || len > 20) {
          next.innerHTML = "패스워드는 6글자 이상 20글자 이하 입니다";
        }
    }
  };

  const handleLogin = (e) => {
    const now = e.target;
    let num = 0;
    e.preventDefault();

    // 유효 데이터 체크
    for (let i = 0; i < now.childNodes.length - 1; i++) {
      if (i % 2 === 0) {
        handleCheck(now.childNodes[i]);
      } else if (now.childNodes[i].innerText !== "") {
        num = 2;
      }
    }

    // 빈칸 체크
    for (let i = 0; i < now.length - 1; i++) {
      if (now[i].value === "") {
        num = 1;
        break;
      }
    }

    // if(num === 1) {
    //   alert('빈칸을 채워주세요');
    // } else if(num === 2) {
    //   alert('빈칸에 알맞게 정보를 입력해주세요');
    // } else {
    fetch("/api/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.target.id.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        history.push("./");
      });
    // }
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="mainLogo" src={logo} alt="메인화면" />
      </Link>
      <form onSubmit={handleLogin} onChange={handleCheck}>
        <input type="text" name="id" placeholder="아이디" />
        <span></span>
        <input type="password" name="password" placeholder="비밀번호" />
        <span></span>
        <button type="submit">로그인</button>
      </form>
      <Link to="findInfo">아이디/비밀번호 찾기</Link>
    </div>
  );
}

export default Login;
