import { Link } from 'react-router-dom';
import logo from '../image/icon.png';

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.id.value,
        password: e.target.password.value
      })
    })
      .then(res => {
        res.json();
        console.log(res);
      })
      .then(res => console.log('Success:', JSON.stringify(res)));
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