import './App.css';
import SideMenu from './components/SideMenu/Index';
import Header from './components/Header/Index';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation
} from "react-router-dom";

import Empty from './components/Empty/Index';
import Dashboard from './components/Dashboard/Index';

function App() {
  const [sideMenuToggled, toggleSideMenu] = useState(false);
  return (
    <Router>
      <div className="wrapper">
          <SideMenu sideMenuToggled={sideMenuToggled} Link={Link} useLocation={useLocation}/>
          <div id="content">
            <Header sideMenuToggled={sideMenuToggled} toggleSideMenu={toggleSideMenu}/>
            <div className="main">
              <Switch>
                <Route path="/empty">
                  <Empty />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </div>
      </div>
    </Router>
  );
}

export default App;
