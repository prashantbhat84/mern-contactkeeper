import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import axios from 'axios';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  SET_CURRENT,
  CONTACT_ERRORS
} from '../types';

const ContactState = props => {
  const initialstate = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialstate);
  //add contacts
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERRORS, payload: err.response.data.msg });
    }
  };
  //deletecontacts
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //update contacts
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //set contact filter
  const filterContact = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //clear contact filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
