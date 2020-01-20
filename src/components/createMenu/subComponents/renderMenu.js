import React from 'react';
import Dish from './dishItem';

const Render = props => {
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
}

export default Render;