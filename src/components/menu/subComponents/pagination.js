import React from 'react';
import dishes from '../structure.json'
import axios from 'axios';

class Pagination extends React.Component {
  dishes = [];

  items = () => {
    axios.get('../structure.json').then(res => {
      this.dishes = res['data'];
    });
  };

  render() {
    return (
      <div className="">
        {Object.keys(dishes)
          .map(e => {
            // return <p key={e}>{dishes[e]['name']}</p>;
            if(dishes[e]['type'] === 'main') {
              return <p key={e}>{dishes[e]['name']}</p>
            }
          })
        }
      </div>
    );
  }
};

export default Pagination;