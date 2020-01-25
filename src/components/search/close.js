import React from 'react';

const Close = props => {
  return <i 
          className="closeSearch" 
          onClick={() => props.close()} 
        />;
};

export default Close;
