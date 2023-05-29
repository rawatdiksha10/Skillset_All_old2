import { Route, Routes  } from "react-router-dom";
import Login from "./components/login/login";
import Navigation from "./components/navigation/navigation";
import MyPage from "./components/engineer/myPage";
import Home from "./components/home/home";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUserSession } from "./services/accoutService";
import { Role, RouterPath } from "./util/enum/Enum";
import SkillSet from "./components/skillset/skillset";
import EngineerList from "./components/engineerlist/engineerlist";
import CreateAccount from "./components/createaccount/newregistrationform";
import PasswordReset from "./components/passwordreset/passwordreset";

function App(){
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const location = useLocation();
  useEffect(() => {
    async function getLoggedInUser() {
      const user:any = await getUserSession();
      setLoggedInUser(user);
    }
    getLoggedInUser();
  }, [location]);

  if(loggedInUser){
    return(
      <div className="App">          
        <Navigation loggedInUser={loggedInUser}></Navigation>
        <Routes>
          <Route path={RouterPath.EngineerList} element={ AuthRoute(<EngineerList/>, Role.Admin, loggedInUser.roleflg) }/>
          <Route path={RouterPath.SkillSet} element={ AuthRoute(<SkillSet/>, Role.Admin, loggedInUser.roleflg) }/>
          <Route path={RouterPath.PasswordReset} element={ AuthRoute(<PasswordReset/>, Role.Admin, loggedInUser.roleflg) }/>
          <Route path={RouterPath.CreateAccount} element={ AuthRoute(<CreateAccount/>, Role.Admin, loggedInUser.roleflg) } />
          <Route path={RouterPath.MyPage} element={ AuthRoute(<MyPage userid={loggedInUser.userid}/>, Role.Engineer, loggedInUser.roleflg) } />
        </Routes>
      </div>
      );
  }else{
    return(
      <div className="App">          
        <Navigation loggedInUser={loggedInUser}></Navigation>
        <Routes>
          <Route path={RouterPath.Home} element={ <Home/> } />
          <Route path={RouterPath.Login} element={ <Login/> } />
        </Routes>
      </div>
      );
  }
}
export default App;

function AuthRoute(element: JSX.Element, accessAvailableRole: number, loggedInRole: number): JSX.Element | null {

  if(accessAvailableRole === loggedInRole){
    return element;
  }else{
    return null;
  }
}
