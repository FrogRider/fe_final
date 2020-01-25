import React, { useState } from 'react';
import './css/slider.scss';

const Slider = () => {
  const [checked, setChecked] = useState(1);

  const navigation = (
    <div className="slider_nav">
      {[1, 2, 3].map(i => (
        <label
          key={i}
          htmlFor={`r${i}`}
          className={`control c${i}`}
        />
      ))}
    </div>
  );

  const hiddenControls = [1, 2, 3].map(i => (
    <input key={i} onChange={() => setChecked(i)} type="radio" name="r" id={`r${i}`} checked={i === checked} />
  ));

  const slidesLables = ['quick delivery', 'available 24/7', 'city-wide'];

  const slides = (
    <div className="slides">
      {[1, 2, 3].map(i => (
        <div className={`slide s${i}`} key={i}>
          <p className='slideLable'>{slidesLables[i-1]}</p>
          <img src={`/img/slider/slider-${i}.jpg`} alt="slide" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="slider_container">
      <div className="slider">
        {hiddenControls}
        {slides}
        {navigation}
      </div>
    </div>
  );
};

export default Slider;
