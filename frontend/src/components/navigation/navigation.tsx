import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt  } from "react-icons/fa";
import { AiOutlineUserAdd,AiFillBell  } from "react-icons/ai";
import { logout } from "../../services/accoutService";
import { removeCookie } from "../../util/cookieService";
import { Role, RouterPath } from "../../util/enum/Enum";
import { User } from "../../models/user";

interface NavitationProps {
  loggedInUser: User | null
}

const Navigation = ({loggedInUser} : NavitationProps) => {
  const navigate = useNavigate();  

  async function logout1(): Promise<void> {    
    var x = await logout(navigate);  
    if(x){
      removeCookie("sv");
      navigate(RouterPath.Home);
    }
  }

  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          {loggedInUser ? <Navbar.Brand><Link style={{ color: "#ffffff", paddingRight:"20px" }} to={loggedInUser.roleflg===Role.Admin ? RouterPath.EngineerList : RouterPath.MyPage }>スキケン</Link></Navbar.Brand> : 
          <Navbar.Brand><Link style={{ color: "#ffffff", paddingRight:"20px" }} to={RouterPath.Home}>スキケン</Link></Navbar.Brand>}        
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">              
            </Nav>

            { loggedInUser?.roleflg===Role.Admin ? 
            <Nav.Item className="me-auto">
              <Row style={{ float: "right" }}>
                <Col xs="1"><Link to={RouterPath.CreateAccount} style={{ color: "#ffffff" }} className="nav-link"><AiOutlineUserAdd></AiOutlineUserAdd></Link></Col>
                <Col xs="1"><Link to={RouterPath.PasswordReset} style={{ color: "#ffffff" }} className="nav-link"><AiFillBell></AiFillBell></Link></Col>
              </Row>             
            </Nav.Item>
            : null
            }         
            
             {loggedInUser ? <Nav style={{ color: "#ffffff" }}>ユーザー名&nbsp;:&nbsp;{loggedInUser.name}&nbsp;&nbsp;&nbsp;</Nav> : null}            
            <Nav>
              {
                loggedInUser ? <span onClick={logout1} style={{ color: "#ffffff", paddingRight:"31px", cursor: "pointer" }}>ログアウト <FaSignOutAlt/></span>  
                 : <Link to={RouterPath.Login} style={{ color: "#ffffff", paddingRight:"31px" }}>ログイン <FaSignInAlt/></Link>                                 
              } 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;