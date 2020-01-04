import React from 'react';
import dishes from '../structure.json';
import Dish from './dishItem'
import axios from 'axios';

class Pagination extends React.Component {
  dishes = [];

  items = () => {
    axios.get('../structure.json').then(res => {
      this.dishes = res['data'];
    });
  };

  getWeekDay = () => new Date(Date.now()).getDay()

  render() {
    return (
      <div className="">
        {Object.keys(dishes).map(e => {
          let item = dishes[e];
          return (
            <Dish
              dispatch={this.props.dispatch}
              key={e}
              pic={item['picture']}
              name={item['name']}
              price={item['price']}
              calories={item['calories']}
              id={e}
            />
          );
        })}
      </div>
    );
  }
};

export default Pagination;