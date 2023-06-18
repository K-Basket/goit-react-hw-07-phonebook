import { useEffect } from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContactsThunk } from 'store/list/listSlice';
import { listSelector } from 'store/list/selectorsList';

export function ContactList() {
  // const items = useSelector(itemsSelector);
  // const isLoading = useSelector(isLoadingSelector);
  // const error = useSelector(errorSelector);

  // const filter = useSelector(filterSelector);

  const { items, isLoading, error, filter } = useSelector(listSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  console.log('items :>> ', items);
  console.log('isLoading :>> ', isLoading);
  console.log('error :>> ', error);
  console.log('filter :>> ', filter);

  function getFiltered() {
    const normalizedFilter = filter.toLowerCase();

    return items.filter(el => el.name.toLowerCase().includes(normalizedFilter));
  }

  return (
    <ul>
      {items &&
        getFiltered().map(({ id, name, phone }) => (
          <li key={id}>
            <div className={css.item}>
              <p>
                <span>{name}</span>
                <span>: {phone}</span>
              </p>

              <button onClick={() => dispatch(deleteContact(id))}>
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
