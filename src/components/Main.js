import { Route, Link, Switch } from "react-router-dom";
import cookie from "cookie";

import Effect from "./Effect";
import Login from "./Login";
import Join from "./Join";

function Main(props) {
  const { setLogin } = props;

  const handleEvent = () => {
    let cookies = cookie.parse(document.cookie);
    if (cookies.id !== undefined) {
      setLogin(true);
    }
  };

  return (
    <div className="main" onLoad={handleEvent}>
      <header>
        <Link to="/login" title="로그인">시작하기</Link>
        <Link to="/join" title="회원가입">함께하기</Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Effect} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Join} />
        </Switch>
      </main>
    </div>
  );
}
export default Main;
