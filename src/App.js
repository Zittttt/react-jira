import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import Register from "./pages/Register/Register";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate exact path={"/"} Component={Login} />
        <HomeTemplate exact path={"/register"} Component={Register} />
        <Route
          exact
          path={"/projectmanagement"}
          component={ProjectManagement}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
