import Notiflix from 'notiflix';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'store/list/listSlice';
import { itemsSelector } from 'store/list/selectorsList';
import { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const items = useSelector(itemsSelector);
  const dispatch = useDispatch();

  function handleChange(evt) {
    if (evt.target.name === 'name') setName(evt.target.value);
    if (evt.target.name === 'number') setNumber(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const normalizedName = name.toLowerCase();

    if (
      items.some(el => el.name.toLowerCase() === normalizedName) ||
      items.some(el => el.phone === number)
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts`);

      return;
    }

    const newContact = {
      name: name,
      phone: number,
    };

    dispatch(addContactThunk(newContact));
    setName('');
    setNumber('');
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
