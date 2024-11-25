import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import NewNavbar from './shared/components/navbar/newNavbar';
import Sidebar from './shared/components/sidebar/Sidebar';
import LoginSociety from './login/pages/LoginSociety';
import SignupSociety from './signup/pages/SignupSociety';
import OwnerInfoMain from './profile/pages/OwnerInfoMain';
import CommunityNoticeBoardDriver from './community communication/CommunityNoticeBoardDriver';

import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';

function App() {
  const { isAdmin, token, login, logout } = useAuth();
  
  return (
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          isAdmin: isAdmin,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <div className="flex flex-col min-h-screen"
        >
          {/* <Navbar /> */}
          <Navbar />
          <div className="flex">
            {token && 
            <Sidebar />
            
            }
            <main className={token ? "flex-1 bg-gray-100 mt-16" : "w-full p-4"}>
              <Switch>
                {token ? (
                  <>
                    <Route
                      path="/dashboard/occupancy-overview"
                      exact
                      component={OwnerInfoMain}
                    />
                    <Route
                      path="/community-communications/notices"
                      exact
                      component={CommunityNoticeBoardDriver}
                    />
                    {/* Fallback to handle undefined routes */}
                    <Route
                      render={() => (
                        // <div className="text-center text-gray-500 p-6">
                        //   <h1 className="text-xl font-bold">404 - Page Not Found</h1>
                        //   <p>Use the sidebar to navigate to an existing page.</p>
                        // </div>
                        <></>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/login" exact component={LoginSociety} />
                    <Route path="/signup" exact component={SignupSociety} />
                    <Route
                      render={() => (
                        // <div className="text-center text-gray-500 p-6">
                        //   <h1 className="text-xl font-bold">404 - Page Not Found</h1>
                        //   <p>Use the navbar to navigate to an existing page.</p>
                        // </div>
                        <></>
                      )}
                    />
                  </>
                )}
              </Switch>
            </main>
          </div>
        </div>
      </AuthContext.Provider>

    </Router>
  );
}


export default App;