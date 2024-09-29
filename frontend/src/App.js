import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import Footer from './shared/components/Footer';
import Login from './login/pages/Login';
import LoginSociety from './login/society/pages/LoginSociety';
import LoginOwner from './login/owner/pages/LoginOwner';
import Signup from './signup/signup/pages/Signup';
import SignupSociety from './signup/signupSociety/pages/SignupSociety';
import SignupOwner from './signup/signupOwner/pages/SignupOwner'
// import WingInformation from './signup/signupSociety/pages/WingInformation'; // Import the new component
import SignupSociety2 from './signup/signupSociety/pages/SignupSociet2';
import SocietyRegistrationForm from './signup/signupSociety/pages/MaintenanceSociety';
import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';

function App() {

  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
        </Switch>
      </>
    )
  } else {
    routes = (
      <>
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
            <LoginOwner />
          </Route>
          <Route path='/signup' exact>
            <Signup />
          </Route>
          <Route path='/signup/signup-owner' exact>
            <SignupOwner />
          </Route>
          <Route path='/signup/signup-society' exact>
            <SignupSociety />
          </Route>
          <Redirect to='/' />
        </Switch>
      </>
    )
  }

  return (
    <Router>
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>

        <Navbar />
        <main>{routes}</main>
        <Footer />

      </AuthContext.Provider>
      
    </Router>
  );
}


export default App;