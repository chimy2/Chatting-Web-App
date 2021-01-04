import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
        <Link to="/login">시작하기</Link>
        <Link to="/join">함께하기</Link>
      </header>
      <article>
        <Switch>
          <Route exact path="/" component={Effect} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Join} />
        </Switch>
      </article>
    </div>
  );
}
export default Main;
