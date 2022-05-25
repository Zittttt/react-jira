import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import Register from "./pages/Register/Register";
// import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import { createBrowserHistory } from "history";
import LoginTemplate from "./template/LoginTemplate/LoginTemplate";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import CreateProject from "./pages/CreateProject/CreateProject";
import User from "./pages/User/User";
import LoadingComponent from "./component/LoadingComponent/LoadingComponent";
import DrawerComponent from "./component/HOC/DrawerComponent";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import ModalComponent from "./component/HOC/ModalComponent";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <DrawerComponent />
      <LoadingComponent />
      <ModalComponent />
      <Switch>
        <LoginTemplate exact path={"/login"} Component={Login} />
        <LoginTemplate exact path={"/register"} Component={Register} />
        <HomeTemplate exact path={"/"} Component={ProjectManagement} />
        <HomeTemplate exact path={"/createproject"} Component={CreateProject} />
        <HomeTemplate exact path={"/user"} Component={User} />
        <HomeTemplate
          exact
          path={"/projectdetail/:projectId"}
          Component={ProjectDetail}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
