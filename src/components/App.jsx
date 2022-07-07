import { nanoid } from 'nanoid';
import { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/filter';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { addItem, deleteItem } from '../store/items';

// const initialState = localStorage.getItem(CONTACTS_LIST)
//   ? JSON.parse(localStorage.getItem(CONTACTS_LIST))
//   : [];

const App = () => {
  const filter = useSelector(state => state.contacts.filter);
  const contacts = useSelector(state => state.contacts.items);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem(CONTACTS_LIST, JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = (name, number) => {
    const nameNormalized = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === nameNormalized)
    ) {
      alert(name + ' is already in the contacts.');
    } else {
      const id = nanoid();
      dispatch(addItem({ id, name, number }));
    }
  };

  const deleteContact = id => {
    dispatch(deleteItem({ id }));
  };

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <>
          <Filter value={filter} onChange={e => dispatch(setFilter(e))} />
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
