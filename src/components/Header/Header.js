import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logOutBlack from '../../images/header__out-symbol/out-black.svg'
import logOutWhite from '../../images/header__out-symbol/out-white.svg'
import menu from '../../images/header__menu/menu.svg';
import menuBlack from '../../images/header__menu/menu_black.svg';
import close from '../../images/header__menu/close.svg'

function Header({ isLoggedIn, location, openLogPopup, loggOut, username }){
    const [isNavbarDisplayed, setIsNavbarDisplayed] = useState(false);
    const [buttonImage, setButtonImage] = useState(menu);
    const handleButtonClick = () =>{
        setIsNavbarDisplayed(!isNavbarDisplayed);
        if(buttonImage === close){
            if(location === '/saved-news'){
                setButtonImage(menuBlack);
            }else{
                setButtonImage(menu);
            }
        } else{
            setButtonImage(close);
        }
    }
    useEffect(() => {
        if(location === '/saved-news'){
            setButtonImage(menuBlack);
        }else{
            setButtonImage(menu);
        }
        setIsNavbarDisplayed(false);
      }, [location]);
    return (
        <header className={`header ${isNavbarDisplayed ? 'header_black' : ''}`}>
            <h2 className='header__title'>NewsExplorer</h2>
            <img src={buttonImage} alt='log-out' onClick={handleButtonClick} className= {`${location === '/saved-news' ? 'header__menu_black' : 'header__menu'}`}/>
            <div className={`header__navbar ${isNavbarDisplayed && 'header__navbar_open'}`}>
                <NavLink to='/' className={`header__redirect-home  
                               ${location === '/saved-news' ? 'header__redirect-home_black' : 'header__redirect-home_active'}
                               `}>Home</NavLink>
                {isLoggedIn 
                  ? <NavLink to='/saved-news' className={`header__redirect-saved
                                  ${location === '/saved-news' ? 'header__redirect-saved_active' : ''
                                  }`}>Saved Articles</NavLink>
                  : ''
                }
                {isLoggedIn === true ? <div  onClick={loggOut} className={`header__log-out ${location === '/saved-news' ? 'header__log-out_saved' : ''}`}>
                    <p className={`header__user ${location === '/saved-news' ? 'header__user_saved' : 'header__user_main'}`}>
                       {username}
                    </p>
                    <img src={location !== '/saved-news' ? logOutWhite : isNavbarDisplayed ? logOutWhite : logOutBlack} alt='log-out' className='header__out-symbol'/>
                </div> : <p onClick={openLogPopup}
                className={`header__log ${location === '/saved-news' ? 'header__log_saved-route' : ''}`}>Sign In</p>}
            </div>
        </header>
    )
}

export default Header;
