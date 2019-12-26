import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './routerNav.scss';
import appReducer from '../state';
import Contacts from '../contacts';
import Prefs from '../prefs';
import Info from '../info';
import Main from '../main';
import Menues from '../menu';
import importedState from '../state/someState'

function Routerr() {

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(appReducer, importedState);

  useEffect(() => {
    dispatch({ type: 'fill' }) //fills dishes list when page is loaded
  }, []);

  return (
    <Router>
      <nav>
        <ul className="menu">
          <Link to="/menu">
            <li>Menues</li>
          </Link>
          <Link to="/contacts">
            <li>Contacts</li>
          </Link>
          <Link to="/info">
            <li>Info</li>
          </Link>
          <Link to="/prefs">
            <li>Preferences</li>
          </Link>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/menu">
          <Menues />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route path="/prefs">
          <Prefs dispatch={dispatch}/>
        </Route>
        <Route path="/info">
          <Info dispatch={dispatch} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routerr;