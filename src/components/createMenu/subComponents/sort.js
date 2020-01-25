import React from 'react';

const Sort = props => {
  return (
    <div className="sort">
      <select value={props.val} onChange={props.changeSortType}>
        <option value="def">Default sorting</option>
        <option value="priceLowHigh">Price low to high</option>
        <option value="priceHighLow">Price high to low</option>
        <option value="nameAB">Name A to B</option>
        <option value="nameBA">Name B to A</option>
      </select>
    </div>
  );
};

export default Sort;
