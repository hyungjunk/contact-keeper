import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {

  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, current, updateContact } = contactContext;

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
  }, [contactContext, current]) // What if only current?

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
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact)
    }
    clearCurrent();
  };


  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current === null ? 'Add Contact' : 'Edit Contact'}</h2>
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
        <input type="submit" value={current === null ? 'Add Contact' : 'Edit Contact'}
          className="btn btn-primary btn-block" />
        {current &&
          <button className="btn btn-secondary btn-block" onClick={() => clearCurrent()} >
            Clear
          </button>
        }
      </div>
    </form>
  )
}
