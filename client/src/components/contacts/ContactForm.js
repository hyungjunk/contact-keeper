import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {

  const contactContext = useContext(ContactContext);
  const { addContact, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      })
    }
  }, [contactContext, current])

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  };
  const onSubmit = e => {
    e.preventDefault();
    addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    })
  };


  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={contact.name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={contact.email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        value={contact.phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input type="radio"
        name="type" value="personal"
        onChange={onChange}
        checked={contact.type === 'personal'} />
      Personal{' '}

      <input type="radio"
        name="type" value="professional"
        onChange={onChange}
        checked={contact.type === 'professional'}
      /> Professional{' '}

      <div>
        <input type="submit" value="Add Contact"
          className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}
