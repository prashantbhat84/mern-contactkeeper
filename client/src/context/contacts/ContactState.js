import React,{useReducer} from 'react';
import uuid from 'uuid';
import  ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
ADD_CONTACT,
DELETE_CONTACT,FILTER_CONTACT,CLEAR_FILTER,SET_CURRENT,CLEAR_CURRENT,UPDATE_CONTACT
} from '../Types';

const ContactState=props=>{
    const initalState={
        contacts:[{
            id:1,
            name:'Prashant',
            email:'pbhat@gmail.com',
            phone:'111-111',
            type:'personal'
        },{
            id:2,
            name:'gauri',
            email:'gbhat@gmail.com',
            phone:'111-112',
            type:'personal'
        },{
            id:3,
            name:'kombu',
            email:'gbhat@gmail.com',
            phone:111333,
            type:'proffesional'
        }],
        current:null

    }
    const [state,dispatch]=useReducer(ContactReducer,initalState);

    //Add COntact
    const addContact=(contact)=>{
        contact.id = uuid.v4();
        dispatch({type:ADD_CONTACT,payload:contact})
    }

    //Delete contact
    const deleteContact=(id)=>{
        dispatch({type:DELETE_CONTACT,payload:id});
    }
    //set current contact
    const setCurrent=(contact)=>{
        dispatch({type:SET_CURRENT,payload:contact});
    }
    //clear current contact
    const clearCurrent=()=>{
        dispatch({type:CLEAR_CURRENT});
    }
    //update contact
    //filter contact
    //clear filter
    return (
        <ContactContext.Provider value={{contacts:state.contacts,
         current:state.current,
         addContact,
         deleteContact,
         setCurrent,
         clearCurrent}}>
            {props.children}
            
        </ContactContext.Provider>
    )

}
export default ContactState;

