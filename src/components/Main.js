import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./Login";
import Join from "./Join";

function Main() {
  return(
    <div className="main">
      <header>
        <Link to="/login">시작하기</Link>
        <Link to="/join">함께하기</Link>
      </header>
      <article>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/join" component={Join}/>
        </Switch>
      </article>
    </div>
  )
}
export default Main;