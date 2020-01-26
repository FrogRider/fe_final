import React, { useState, useEffect } from 'react';

const MapCol = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/contactsText.txt')
      .then(r => r.text())
      .then(text => {
        setText(text);
      });
  }, []);

  return (
    <div className="col col3"> 
      <div className="box">
        <form>
          <input type="text" placeholder='Name'/>
          <input type="text" placeholder='Phone'/>
          <input type="text" placeholder='Email'/>
          <button onClick={e => e.preventDefault()}>Confirm</button>
        </form>
      </div>

      <div className="text">{'Contact us ' + text}</div>
    </div>
  );
};

export default MapCol;
