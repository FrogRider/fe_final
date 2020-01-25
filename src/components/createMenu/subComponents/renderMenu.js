import React from 'react';
import Dish from './dishItem';

const Render = props => {
  if(props.items.length !== 0) {
    return props.items.map(item => {
      if (item['disabled'] === false) {
        return (
          <Dish
            settings={[
              item['name'],
              item['price'],
              item['calories'],
              item['picture'],
              item['type'],
              item['vegan'],
              item['diet'],
              item['gluten_free']
            ]}
            key={item['name']}
          />
        );
      }
      return false
    });
  } else 
    return <div className='emptyMenu'>
              Nothing to show right now :c <br/>
              Here's picture of kitten instead <br/>
              <img src="./img/kitten.svg" alt="kitten"/>

           </div>
}

export default Render;