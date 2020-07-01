import React, { userReducer, useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from '../types';

const ContactState = () => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "김형준",
        email: "jun@email.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "김진수",
        email: "soo@email.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "김지후",
        email: "hoo@email.com",
        phone: "333-333-3333",
        type: "business"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set current contact

  // Clear current contact

  // Update Contacts

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;