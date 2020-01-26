import React from 'react';
// import state from '../../state/someState';
import Service from '../../serviceFuncs';
import Spec from './dishSpecs'

let Dish = props => {
  let [name, price, calories, pic, type, vegan, diet, gluten_free, availableOn] = [
    ...props.settings
  ];

  const add = () => {
    Service.addToOrder(name, 1, price, availableOn);
  };

  return (
    <div className="dish card">
      <p className="dishType">{type.toUpperCase()}</p>
      <div className="imgPlaceholder">
        <img src={'/img/dishes/' + pic} alt={name} title={name} />
      </div>
      <Spec specs={[vegan, diet, gluten_free]} />
      <p>{name}</p>
      <p>Calories: {calories}</p>
      <p>Price: {price}</p>
      <button
        onClick={() => {
          add();
        }}
      >
        Add
      </button>
      <br />
    </div>
  );
};

export default Dish;