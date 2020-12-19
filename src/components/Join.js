import { Link } from 'react-router-dom';
import logo from '../image/icon.png';
import { useHistory } from "react-router-dom";

function Join() {
  let history = useHistory();
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
        if(res.status === 201){
          history.push('./');
        }
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