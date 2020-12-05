import { Link } from 'react-router-dom';
import logo from '../image/icon.png';

function Login() {
  return(
    <div className="login">
      <Link to="/"><img className="mainLogo" src={logo} alt="메인화면"/></Link>
      <form method="post" action="/loginAction">
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