import React, { useEffect, useState } from 'react';
import state from '../state/someState';
import Service from '../serviceFuncs';
import './css/selectMenu.scss';

const SelectMenu = () => {

  const [menues, setMenues] = useState([]);
  const [allItems, setAllItems] = useState([]);

  //triggers when component loads
  useEffect(() => {
    Service.prepareData().then(res => {
      setAllItems(res);
    })
    console.log(Service.getWeekDay())
  }, []);

  useEffect(() => {
    generateMenus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems]);

  const addMenuToOrder = array => {
    array.forEach(e => Service.addToOrder(e['name'], 1, e['price']))
  }

  const getKey = array => {
    //generate key consisting first letters of each dish
    let res = '';
    array.forEach(e => {
      if(e !== undefined) res += e['name'][0]
    })
    // console.log(res)
    return res;
  }

  const getIdentical = array => {
    //return false if all elements are unique
    let res = array.filter(function(elem, pos, arr) {
      return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
    });
    return res.length !== 0;
  };
  
  const splitDishes = () => {
    //separate all dishes by types
    if(allItems.length !== 0) {
      let garnishes = allItems.filter(i => i['type'] === "garnish");
      let mains = allItems.filter(i => i['type'] === "main");
      let drinks = allItems.filter(i => i['type'] === "drink");
      return [ garnishes ,  mains ,  drinks ];
    }
  }

  const generateMenus = () => {

    if(splitDishes() !== undefined) {
      setMenues([])
      let garnishesQ = splitDishes()[0].length;
      let mainsQ = splitDishes()[1].length;
      let drinksQ = splitDishes()[2].length;
      let randomMenu = []
      for (let i = 0; i < 6; i++) {
        randomMenu.push([
          //get random dish on each type
          splitDishes()[0][Math.floor(Math.random() * garnishesQ)],
          splitDishes()[1][Math.floor(Math.random() * mainsQ)],
          splitDishes()[2][Math.floor(Math.random() * drinksQ)]
        ])
      }
      
      let identityKeys = [];
      randomMenu.map(e => identityKeys.push(getKey(e)))
      //just to show when menus were re-generated
      if(getIdentical(identityKeys) === true && state['debugger'] === true) {
        console.log('%c similar menus detected ', 'color: orange')
        console.log(`%c ${identityKeys}`, 'color: orange')
        console.log('%c menues re-generated ', 'color: orange')
      }
      //set menues to the state if all dishes sets are unique
      getIdentical(identityKeys) === false ? setMenues(randomMenu) : generateMenus()
    }
  }

  return (
    <div>
      <div className="dishesContainer select">
        {menues.map(i => {
          let price = i[0]['price'] + i[1]['price'] + i[2]['price'];
          let calories = i[0]['calories'] + i[1]['calories'] + i[2]['price'];
          return (
            <div key={getKey(i)} className="dish card">
              <p>{i[0]['name']}</p>
              <p>{i[1]['name']}</p>
              <p>{i[2]['name']}</p>
              <div className="totals">
                <p>Calories: {calories}</p>
                <p>Price: {price}</p>
              </div>
              <button onClick={() => addMenuToOrder(i)} className='add'>add</button>
            </div>
          );
        })}
      </div>
      <button onClick={generateMenus} className='random'>Random</button>
    </div>
  );
}

export default SelectMenu;