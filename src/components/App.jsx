import { nanoid } from 'nanoid';
import { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/filter';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

const CONTACTS_LIST = 'contactList';

const reducer = (contacts, action) => {
  switch (action.type) {
    case 'add':
      return [...contacts, action.contact];
    case 'delete':
      return contacts.filter(contact => action.contact.id !== contact.id);
    default:
      return contacts;
  }
};

const initialState = localStorage.getItem(CONTACTS_LIST)
  ? JSON.parse(localStorage.getItem(CONTACTS_LIST))
  : [];

const App = () => {
  // const state = store.getState();
  const filter = useSelector(state => state.contacts.filter);
  const dispatch2 = useDispatch();

  const [contacts, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(CONTACTS_LIST, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const nameNormalized = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === nameNormalized)
    ) {
      alert(name + ' is already in the contacts.');
    } else {
      const id = nanoid();
      dispatch({ type: 'add', contact: { id, name, number } });
    }
  };

  const deleteContact = id => {
    dispatch({ type: 'delete', contact: { id } });
  };

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <>
          <Filter value={filter} onChange={e => dispatch2(setFilter(e))} />
          <ContactList
            contacts={contacts}
            filter={filter.toLowerCase()}
            onDeleteItem={deleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
