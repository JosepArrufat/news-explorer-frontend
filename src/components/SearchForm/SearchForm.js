import './SearchForm.css';
import { useState } from 'react';

function SearchForm(props) {
  const [topic, setTopic] = useState('');

  const handleChange = (evt) => {
    setTopic(evt.target.value);
  };
  const handleSubmit = (evt) => {
    props.searchNews(topic);
    evt.preventDefault();
  };
  return (
    <form action='GET' onSubmit={handleSubmit} className='finder-form'>
      {' '}
      <input
        type='text'
        className='finder-form__input'
        placeholder='Enter Topic'
        value={topic}
        onChange={handleChange}
      />{' '}
      <button
        type='submit'
        className='finder-form__button'
      >
        Search
      </button>
    </form>
  );
}
export default SearchForm;
