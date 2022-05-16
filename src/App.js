import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import Register from "./pages/Register/Register";
// import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import { createBrowserHistory } from "history";
import LoginTemplate from "./template/LoginTemplate/LoginTemplate";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import CreateProject from "./pages/CreateProject/CreateProject";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <LoginTemplate exact path={"/login"} Component={Login} />
        <LoginTemplate exact path={"/register"} Component={Register} />
        <HomeTemplate exact path={"/"} Component={ProjectManagement} />
        <HomeTemplate exact path={"/createproject"} Component={CreateProject} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
