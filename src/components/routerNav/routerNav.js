import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './routerNav.scss';
import appReducer from '../state';
import Contacts from '../contacts';
import Prefs from '../prefs';
import Info from '../info';
import Main from '../main';
import Menues from '../menu';
import importedState from '../state/someState'
import Order from '../order/Order';


let MyRouter = () => {

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(appReducer, importedState);
  const [active, setActive] = useState([false,false,false,false]);

  const changeTab = num => {
    let newVal = [false,false,false,false]
    newVal[num] = true;
    setActive(newVal);
    localStorage.setItem('menu', JSON.stringify(newVal))
  }

  useEffect(() => {
    let raw = localStorage.getItem('menu');
    if(raw != null) {
      setActive(JSON.parse(raw))
    }
  },[]);

  const links = [
    { to: '/menu', label: 'Menues', num: 0 },
    { to: '/contacts', label: 'Contacts', num: 1 },
    { to: '/info', label: 'Info', num: 2 },
    { to: '/prefs', label: 'Preferences', num: 3 }
  ];

  return (
    <Router>
      <nav>
        <ul className="menu">
          {links.map(link => {
            return (
              <Link 
                className={`${active[link['num']] === true ? 'active' : ''}`}
                onClick={() => {changeTab(link['num'])}}
                to={link['to']} 
                key={link['label']}
              >
                <li>{link['label']} </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      <Order />

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
          <Info />
        </Route>
      </Switch>
    </Router>
  );
}

export default MyRouter;