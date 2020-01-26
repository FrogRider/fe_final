import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';

const MapCol = () => {
  const targetRef = useRef();
  const [width, setWidth] = useState(0);
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    if (targetRef.current) {
      setWidth(targetRef.current.offsetWidth);
    }
  }, []);

  useEffect(()=>{
    fetch('/contactsText.txt')
    .then((r) => r.text())
    .then(text  => {
      setText(text);
    })  
  },[])

  return (
    <div className="col col1" ref={targetRef}>
      <div className="mapPlaceholder">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5837.73552132241!2d30.5254028689923!3d50.43385093903223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf041bfe3ea5%3A0xc77b785e2b62571e!2z0LHRg9C7LiDQm9C10YHQuCDQo9C60YDQsNC40L3QutC4LCAxNCwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1580055135788!5m2!1sru!2sua"
          height={width}
          frameBorder="0"
          allowFullScreen=""
          title="map"
        ></iframe>
      </div>

      <div className="text">
        {'Our location ' + text}
      </div>
    </div>
  );
};

export default MapCol;
