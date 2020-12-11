import { Link } from 'react-router-dom';
import logo from '../image/icon.png';

function Join() {
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
        email: e.target.email.value,
        phone: e.target.phone.value
      })
    })
      .then(res => {
        console.log(res);
      });
  };
  return(
    <div className="join">
      <Link to="/"><img className="mainLogo" src={logo} alt="메인화면"/></Link>
      <form onSubmit={handleJoin}>      
        <input type="text" name="id" placeholder="아이디"/>
        <span/>
        <input type="password" name="password" placeholder="비밀번호"/>
        <span/>
        <input type="password" name="password2" placeholder="비밀번호 확인"/>
        <span/>
        <input type="text" name="name" placeholder="이름"/>        
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