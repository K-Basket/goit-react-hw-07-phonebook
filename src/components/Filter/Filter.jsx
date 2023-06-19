import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { listSelector } from 'store/list/selectorsList';
import { setFilter } from 'store/list/listSlice';

export function Filter() {
  const filter = useSelector(listSelector);
  const dispatch = useDispatch();

  function changeFilter(evt) {
    dispatch(setFilter(evt.currentTarget.value));
  }

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
}
