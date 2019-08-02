import React ,{useReducer} from 'react';
import ContactContext from './ContactContext';
import uuid from 'uuid';
import ContactReducer from './ContactReducer';
import {ADD_CONTACT,UPDATE_CONTACT,DELETE_CONTACT,FILTER_CONTACTS,CLEAR_CURRENT,CLEAR_FILTER,SET_CURRENT} from '../types';

const ContactState=(props)=>{


    const initialstate={
        contacts:[{
            id:1,
            name:'Prashant',
            email:'test@gmail.com',
            phone:'111-111-111',
            type:'personal'
        },{
            id:2,
            name:'Gauri',
            email:'test1@gmail.com',
            phone:'222-222-222',
            type:'professional'
        },{
            id:3,
            name:'Amit',
            email:'test2@gmail.com',
            phone:'333-333-333',
            type:'personal'
        }],
        current:null,
        filtered:null

    }
    const [state,dispatch]= useReducer(ContactReducer,initialstate);
//add contacts
const addContact= contact=>{
    contact.id = uuid.v4();
    dispatch({type:ADD_CONTACT,payload:contact});
}
//deletecontacts
const deleteContact=id=>{
    dispatch({type:DELETE_CONTACT,payload:id})
}
//update contacts
const updateContact=contact=>{

    dispatch({type:UPDATE_CONTACT,payload:contact})
}
//set current contact
const setCurrent=contact=>{

    dispatch({type:SET_CURRENT,payload:contact})
}
//clear current contact
const clearCurrent= ()=>{

    dispatch({type:CLEAR_CURRENT})
}
//set contact filter
const filterContact=text=>{

    dispatch({type:FILTER_CONTACTS,payload:text})
}
//clear contact filter
const clearFilter= ()=>{

    dispatch({type:CLEAR_FILTER})
}
return (<ContactContext.Provider value={
    {
        contacts:state.contacts,
        current: state.current,
        filtered:state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
    }
}>{props.children}</ContactContext.Provider>);
}
export default ContactState;

