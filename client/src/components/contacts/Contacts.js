import React,{Fragment,useContext} from 'react';
import ContactItem from './ContactItem';

import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
    const contactsContext= useContext(ContactContext);
    const {contacts,filtered}= contactsContext; 
    if(contacts.length===0){
        return <h4>Please Add a contact</h4>
    }
   

    return (
        <Fragment>
           {filtered!==null
             ? filtered.map(contact=>(<ContactItem key={contact.id} contact={contact}/>)):
             contacts.map(contact=>(<ContactItem key={contact.id} contact={contact}/>))}
           
        </Fragment>
    )
}

export default Contacts
