import React from 'react'

const CloseBtn = props => {
  return (
    <i
      className="close"
      onClick={props.close}
    ></i>
  )
}


export default CloseBtn