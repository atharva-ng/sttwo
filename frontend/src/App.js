import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom';
import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import Footer from './shared/components/Footer';
import Login from './login/pages/Login';
import NavbarLogin from './shared/components/navbar/NavbarLogin';
import NavbarSignup from './shared/components/navbar/NavbarSignup';
import LoginSociety from './login/society/pages/LoginSociety';
import Signup from './signup/signup/pages/Signup';
import SignupSociety from './signup/signupSociety/pages/SignupSociety';
import WingInformation from './signup/signupSociety/pages/WingInformation'; // Import the new component


function App() {

  const location = useLocation();
  let HeaderComponent;
  if (location.pathname.startsWith('/login')) {
    HeaderComponent = NavbarLogin;
  } else if (location.pathname.startsWith('/signup')) {
    HeaderComponent = NavbarSignup;
  } else {
    HeaderComponent = Navbar;
  }

  return (
    <>
      <HeaderComponent />   
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/login/login-society' exact>
          <LoginSociety />
        </Route>
        <Route path='/login/login-owner' exact>
          <Homepage />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        <Route path='/signup/signup-owner' exact>
          <Homepage />
        </Route>
        <Route path='/signup/signup-society' exact>
          <SignupSociety />
        </Route>
        <Route path='/signup/wing-information' exact> 
          <WingInformation /> 
        </Route>
        <Redirect to='/' />
      </Switch>
      <Footer />
    </>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
