import React, { userReducer, useReducer } from 'react';
import { v4 } from 'uuid';
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

const ContactState = props => {
  const initialState = {
    current: null,
    filtered: null,
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
        type: "professional"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  }

  // Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  // Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  // Update Contacts
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text
    })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;