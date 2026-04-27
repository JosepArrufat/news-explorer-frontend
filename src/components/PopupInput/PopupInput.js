import './PopupInput.css';

function PopupInput(props) {
  const name = props.name.split(' ')[1];
  const handleChange = (evt) =>{
    props.handleChange(evt.target.value);
    props.vanilaValidate();
    if(props.name === 'Sign-up Email' || props.name === 'Sign-in Email'){
      if(evt.target.validity.valid){
        props.isEmail(true);
      }else{
        props.isEmail(false);
      }
    }
  }
  return(
    <>
    <h3 className='popup__subtitle'>{name}</h3>
    <input
      id={props.name}
      type={name}
      className='form__edit-form'
      name={props.name}
      placeholder= {`Enter ${name}`}
      required
      onChange={handleChange}
      value={props.value}
    /></>
  )
}

export default PopupInput;
