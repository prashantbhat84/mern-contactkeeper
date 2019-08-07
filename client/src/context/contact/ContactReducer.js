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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        error: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
