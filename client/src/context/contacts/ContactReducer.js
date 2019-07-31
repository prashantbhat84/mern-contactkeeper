
import {
    ADD_CONTACT,
    DELETE_CONTACT,FILTER_CONTACT,CLEAR_FILTER,SET_CURRENT,CLEAR_CURRENT,UPDATE_CONTACT
    } from '../Types';
    export default (state,action)=>{
        switch(action.type){
             case ADD_CONTACT:
                 return {
                     ...state,
                     contacts:[...state.contacts,action.payload]
                 };
                 case DELETE_CONTACT:
                      return {
                          ...state,
                          contacts:state.contacts.filter(contact=>contact.id !==action.payload)
                      };
                  case SET_CURRENT:
                      return{
                          ...state,
                          contacts:action.payload
                      }; 
                     case CLEAR_CURRENT:
                         return{
                             ...state,
                             contacts:null
                         }   
            default:
            return state;
            
        }
        
    }