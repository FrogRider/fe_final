import React from 'react';
import MapCol from './mapCol';
import Cards from './contactsCards';
import Form from './contactsForm';
import './css/contacts.scss';

const Contacts = () => {
  return (
    <div className="contacts block">
      <MapCol />
      <Cards />
      <Form />
    </div>
  );
};

export default Contacts;