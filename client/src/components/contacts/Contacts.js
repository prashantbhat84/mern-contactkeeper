import React,{Fragment,useContext} from 'react';
import ContactItem from './ContactItem';

import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
    const contactsContext= useContext(ContactContext);
    const {contacts}= contactsContext; 
   

    return (
        <Fragment>
           {contacts.map(contact=>(<ContactItem key={contact.id} contact={contact}/>))}
        </Fragment>
    )
}

export default Contacts
