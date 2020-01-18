import React, { /*useReducer,*/ useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './routerNav.scss';
// import appReducer from '../state';
import Contacts from '../contacts';
import Prefs from '../prefs';
import Info from '../info';
import Main from '../main';
import CreateMenu from '../createMenu';
import Order from '../order/Order';
import Search from '../search';
import SelectMenu from '../selectMenu'


let MyRouter = () => {

  const [active, setActive] = useState([false,false,false,false]);

  useEffect(() => {
    let raw = localStorage.getItem('menu');
    if(raw != null) {
      setActive(JSON.parse(raw))
    }
  },[]);

  const changeTab = num => {
    let newVal = [false,false,false,false]
    newVal[num] = true;
    setActive(newVal);
    localStorage.setItem('menu', JSON.stringify(newVal))
  }

  const menuItems = [
    // { to: '/menu', label: 'Menues', num: 0 },
    { to: '/contacts', label: 'Contacts', num: 1 },
    { to: '/info', label: 'Info', num: 2 },
    { to: '/prefs', label: 'Preferences', num: 3 }
  ];

  const dropDown = () => {
    return (
      <div className={`dropParent ${active[0] === true ? 'active' : ''}`}>
        <li>Menues</li>
        <ul>
          <li><Link to='/create_menu' onClick={() => changeTab(0)}>Create</Link></li>
          <li><Link to='/select_menu' onClick={() => changeTab(0)}>Select</Link></li>
        </ul>
      </div>
    );
  };

  const Items = menuItems.map(link => {
    return (
      <Link
        className={active[link['num']] === true ? 'active' : ''}
        onClick={() => changeTab(link['num'])}
        to={link['to']}
        key={link['label']}
      >
        <li>{link['label']} </li>
      </Link>
    );
  });
  
  return (
    <Router>
      <nav>
        <ul className="menu">
          {dropDown()}
          {Items}
        </ul>
      </nav>
      <Order />
      {/* <Search /> */}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/create_menu">
          <CreateMenu />
        </Route>
        <Route path="/select_menu">
          <SelectMenu />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/prefs">
          <Prefs /*dispatch={dispatch}*/ />
        </Route>
        <Route path="/info">
          <Info />
        </Route>
      </Switch>
    </Router>
  );
}

export default MyRouter;