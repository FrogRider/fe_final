import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './routerNav.scss';
import appReducer from '../state';
import Contacts from '../contacts';
import Prefs from '../prefs';
import Info from '../info';
import Main from '../main';
import Menues from '../menu';
import importedState from '../state/someState'

const Routerr = () => {

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(appReducer, importedState);

  const links = [
    { to: '/menu', label: 'Menues' },
    { to: '/contacts', label: 'Contacts' },
    { to: '/info', label: 'Info' },
    { to: '/prefs', label: 'Preferences' }
  ];

  return (
    <Router>
      <nav>
        <ul className="menu">
          {links.map(link => {
            return (
              <Link to={link['to']} key={link['label']}>
                <li>{link['label']}</li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/menu">
          <Menues dispatch={dispatch}/>
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/prefs">
          <Prefs dispatch={dispatch} />
        </Route>
        <Route path="/info">
          <Info dispatch={dispatch} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routerr;