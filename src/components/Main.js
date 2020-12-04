import { Link } from "react-router-dom";

function Main() {
  return(
    <div className="main">
      <header>
        <Link to="/login">시작하기</Link>
        <Link to="/join">함께하기</Link>
      </header>
      <article/>
    </div>
  )
}
export default Main;