import React, { useEffect } from 'react';
import dishes from '../structure.json';
import Dish from './dishItem'
import axios from 'axios';

class Pagination extends React.Component {
  // notWorkingDishesArray = [];    //СПРОСИТЬ (в телеге)
  // getFromJson () {
  //   return(axios.get('../structure.json').then(res => {
  //     console.log(res['data'])
  //     this.notWorkingDishesArray = res['data']
  //   }))
  // };
  // componentDidMount(){
  //   this.getFromJson()
  //   console.log(this.notWorkingDishesArray)
  // }

  dishesList = dishes;

  filteredItems = settings => {
    settings.map(s => {
      this.dishesList = this.dishesList.filter(el => {
        return el[s] == true
      });
    })
  };

  getWeekDay = () => new Date(Date.now()).getDay();

  render() {
    this.filteredItems(['glutenFree', 'vegan'])
    console.log(this.dishesList)
    const items = Object.keys(this.dishesList).map(e => {
      let item = this.dishesList[e];
      let days = item['availableOn'];
      if (days.indexOf(/*this.getWeekDay()*/ 1) !== -1) {
        return (
          <Dish
            dispatch={this.props.dispatch}
            key={item['name']}
            pic={item['picture']}
            name={item['name']}
            price={item['price']}
            calories={item['calories']}
          />
        );
      }
    });
    return <div className="">{items}</div>;
  }
};

export default Pagination;