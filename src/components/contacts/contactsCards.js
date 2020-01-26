import React from 'react'

const Cards = () => {

  return (
    <div className="col col2">
      <a className="card" href='tel:8 8800 555 35 35'>
        <img src="/img/phone.svg" alt="phone"/>
        <p className='text'>8 8800 555 35 35</p>
      </a>
      <a className="card" href='mailto:testmail@test.mail'>
        <img src="/img/email.svg" alt="email"/>
        <p className='text'>testmail@test.mail</p>
      </a>
      <a className="card" href='https://www.google.com.ua/' target='_blank' rel="noopener noreferrer"> 
        <img src="/img/location.svg" alt="location"/>
        <p className='text'>Kiev, UA</p>
      </a>
    </div>
  )
}

export default Cards