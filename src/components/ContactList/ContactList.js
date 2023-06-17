// import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'store/list/listSlice';
import { contactsSelector, filterSelector } from 'store/list/selectorsList';

export function ContactList() {
  const filter = useSelector(filterSelector);
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  function getFiltered() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <ul>
      {getFiltered().map(({ id, name, number }) => (
        <li key={id}>
          <div className={css.item}>
            <p>
              <span>{name}</span>
              <span>: {number}</span>
            </p>

            <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
