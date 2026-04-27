import './Popup.css';
import button from '../../images/button_type_close/close.svg';

function Popup(props) {
  const onSubmit = (evt) =>{
    props.onSubmit();
    evt.preventDefault();
  }
  const name = props.name.split(' ')[1];
  return(
    <section className='popup-section'>
    <div
      className={`popup popup_type_sign-${name} ${
        props.isLogPopupOpen ? 'popup_open' : ''
      }`}
    >
      <div className='popup__box'>
        <h2 className='popup__title'>{props.name}</h2>
        <form
          onSubmit={onSubmit}
          className={`form form_type_sign-${name}`}
          name={props.name}
        >
          {props.children}
          <button className={`form__save-button ${props.isValid ? 'form__save-button_active' : 'form__save-button_disabled'}`} 
          type='submit' disabled={!props.isValid}>
            {props.name}
          </button>
        </form>
        <button className='form__close-button' type='reset'>
          <img
            src={button}
            alt='close icon'
            className='button button_type_close'
            onClick={props.closePopups}
          />
        </button>
        <p className='popup__change'>
          Or 
          <button type='button' className='popup__change-button' onClick={props.changePopup}>
              {props.changeName}
          </button>
        </p>
      </div>
      </div>
      </section>
  )
}

export default Popup;
