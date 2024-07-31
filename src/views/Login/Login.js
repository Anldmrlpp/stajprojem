import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdminHandler, loginUserHandler } from '../../redux/authActions';
import { useNavigate } from 'react-router-dom';
import image1 from '../../images/SignUpAndLoginImage1.svg';
import image2 from '../../images/SignUpAndLoginImage2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faLock, faEnvelope, faKey  } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState("");

    const [error, setError] = useState(null);

    const [signUpMode, setSignUpMode] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setSignUpMode(true);
        setError(null);
    };

    const handleSignInClick = () => {
        setSignUpMode(false);
        setError(null);
    };

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        if(name === "email") {
            setEmail(value);
        }
        if(name === "password") {
            setPassword(value);
        }
        if(name === "adminKey") {
            setAdminKey(value);
        }

        setError(null);
    }

    const onClickSubmitForUser = async (event) => {
        event.preventDefault();

        const creds = {
            email,
            password
        }

        try{
            await dispatch(loginUserHandler(creds));
            navigate("/");
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    const onClickSubmitForAdmin = async (event) => {
        event.preventDefault();
        
        const creds = {
            email,
            password,
            adminKey
        }

        try {
            await dispatch(loginAdminHandler(creds));
            navigate("/");
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    return (
        <div id="login">
            <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Kullanıcı Olarak Giriş Yap</h2>
                        <div className="input-field">
                        <i className="fas fa-envelope">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </i>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={onChange} />
                        </div>
                        <div className="input-field">
                        <i className="fas fa-lock">
                        <FontAwesomeIcon icon={faLock}/>
                        </i>
                        <input type="password" name="password" placeholder="Şifre" value={password} onChange={onChange} />
                        </div>
                        <input type="submit" value="Giriş Yap" className="btn solid" onClick={onClickSubmitForUser} />
                        <p className="social-text">Veya sosyal medya hesaplarınız ile giriş yapın</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faGoogle}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebookF}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faGithub}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faLinkedinIn}/>
                            </a>
                        </div>
                        {error != null && <label className="alert alert-danger mt-2">{error}</label> }
                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Admin Olarak Giriş Yap</h2>
                        <div className="input-field">
                        <i className="fas fa-envelope">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </i>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                        </div>
                        <div className="input-field">
                        <i className="fas fa-lock">
                        <FontAwesomeIcon icon={faLock}/>
                        </i>
                        <input type="password" name="password" placeholder="Şifre" value={password} onChange={onChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock">
                            <FontAwesomeIcon icon={faKey}/>
                            </i>
                            <input type="password" name="adminKey" placeholder="Admin Anahtarı" value={adminKey} onChange={onChange} />
                        </div>
                        <input type="submit" className="btn-submit" value="Giriş Yap" onClick={onClickSubmitForAdmin} />
                        <p className="social-text">Veya sosyal medya hesaplarınız ile giriş yapın</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faGoogle}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebookF}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faGithub}/>
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faLinkedinIn}/>
                            </a>
                        </div>
                        {error != null && <label className="alert alert-danger mt-2">{error}</label> }
                    </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                    <div className="content">
                        <h3>Admin Girişi</h3>
                        <p>
                        Admin olarak giriş yapabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
                        </p>
                        <button className="btn transparent" onClick={handleSignUpClick}>
                        Giriş Yap
                        </button>
                    </div>
                    <img src={image2} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                    <div className="content">
                        <h3>Kullanıcı Girişi</h3>
                        <p>
                        Kullanıcı olarak giriş yapabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
                        </p>
                        <button className="btn transparent" onClick={handleSignInClick}>
                        Giriş Yap
                        </button>
                    </div>
                    <img src={image1} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
