import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export function App() {
  return (
    <>
      <h1>Phonebook</h1>
      <p>React Hooks & Redux toolkit</p>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
}
