import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import Sidebar from './shared/components/sidebar/Sidebar';
import Footer from './shared/components/Footer';
import LoginSociety from './login/pages/LoginSociety';
import SignupSociety from './signup/pages/SignupSociety';

import SocietyProfile from './profile/pages/SocietyProfile';
import OwnerInfoMain from './profile/pages/OwnerInfoMain';
import FlatsInformation from './profile/pages/FlatsInformation';
import CommunityNoticeBoardDriver from './community communication/CommunityNoticeBoardDriver';

import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';
import OwnerInfo from './profile/pages/OwnerInfo';

function App() {

  const { isAdmin, token, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>

        <Route path='/community-communications/helpdesk' exact>
          <OwnerInfoMain token={token}/>
        </Route>
        <Route path='/profile' exact>
          <SocietyProfile />
        </Route>
        <Route path='/flatsInformation' exact>
          <FlatsInformation />
        </Route>
        <Route path='/dashboard/occupancy-overview' exact>
          <OwnerInfoMain token={token}/>
        </Route>
        <Route path='/notice' exact>
          <CommunityNoticeBoardDriver />
        </Route>
        <Redirect to='/profile' />
        {/* <ToastContainer /> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <Route path='/login' exact>
          <LoginSociety />
        </Route>
        <Route path='/signup' exact>
          <SignupSociety />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <Router>
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        isAdmin: isAdmin,
        token: token,
        login: login,
        logout: logout
      }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            {/* Conditionally render the Sidebar only when user is logged in */}
            {token && <Sidebar className="w-1/4" />}
            
            {/* Main content area */}
            <main className={token ? "flex-1 bg-gray-100" : "w-full p-4"}>
              {routes}
            </main>
          </div>
          <Footer />
        </div>
      </AuthContext.Provider>
    </Router>
  );
}
export default App;