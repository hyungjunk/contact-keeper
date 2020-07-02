import React, { useEffect, Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';


export const Contact = () => {

  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return (
    <>
      {contacts.map(contact => (
        <ContactItem id={contact.id} contact={contact} />
      ))}
    </>
  )
}
