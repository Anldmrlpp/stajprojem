import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutSuccess } from '../redux/authActions';
import skyForTopbar from '../images/sky.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faSignInAlt, faUserPlus, faSignOutAlt, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import '../style/Components.css';
import ProfileImage from './ProfileImage';

const TopBar = () => {
    const { isLoggedIn, email, imageUrl } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        email : store.email,
        imageUrl: store.imageUrl
    }));

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

    return (
        <div id="topbar">
            <nav>
                <div className="container">
                    <Link to="/" className="brand-name">
                        <h3 className="logo">Kafein<span>Technology Solutions</span></h3>
                    </Link>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="bar"></div>
                    </div>
                </div>
            </nav>
            <header>
                <img src={skyForTopbar} className="sky translate" data-speed="0.5" alt="" />
            </header>
            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="text-center">
                    <li>
                        <Link to="/"><FontAwesomeIcon icon={faHome} className="me-2" />Anasayfa</Link>
                    </li>
                    <li>
                        <Link to="/permission"><FontAwesomeIcon icon={faUmbrellaBeach} className="me-2" />İzinler</Link>
                    </li>
                    <li>
                        <Link to="/contact"><FontAwesomeIcon icon={faPhone} className="me-2" />İletişim</Link>
                    </li>
                    {!isLoggedIn &&
                        <div>
                            <li>
                                <Link to="/signup"><FontAwesomeIcon icon={faUserPlus} className="me-2" />Kaydol</Link>
                            </li>
                            <li>
                                <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} className="me-2" />Giriş Yap</Link>
                            </li>
                        </div>
                    }
                    {isLoggedIn &&
                        <div className="d-flex align-items-center">
                            <li>
                                <Link to={`/profile/${email}`}>
                                    <ProfileImage email={email} width={"32"} height={"32"} tempImage={imageUrl} imageCss="m-auto me-2" />
                                    Profil
                                </Link>
                            </li>
                            <li onClick={onLogoutSuccess}>
                                <Link to="/"><FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Çıkış Yap</Link>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
}

export default TopBar;