import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/filter';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { addItem, deleteItem } from '../store/items';
import style from './App.module.css';

const App = () => {
  const filter = useSelector(state => state.contacts.filter);
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

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
