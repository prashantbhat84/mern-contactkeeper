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
  CONTACT_ERRORS,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';
//test

const ContactState = props => {
  const initialstate = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialstate);
  //getcontacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERRORS, payload: err.response.data.msg });
    }
  };

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
  //update contacts
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERRORS, payload: err.response.data.msg });
    }
  };
  //deletecontacts
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERRORS, payload: err.response.data.msg });
    }
  };
  //clearContacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
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
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
