import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAdminHandler, signUpUserHandler } from '../../redux/authActions';
import { useApiProgress } from '../../shared/ApiProgress';
import image1 from '../../images/SignUpAndLoginImage1.svg';
import image2 from '../../images/SignUpAndLoginImage2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock, faEnvelope, faAddressCard, faKey   } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [error, setError] = useState(null);

  const [signUpMode, setSignUpMode] = useState(false);

  const pendingApiCallUser = useApiProgress('post','/api/v1/employee/signup');
  const pendingApiCallAdmin = useApiProgress('post','/api/v1/admins/signup');

  const dispatch = useDispatch();

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

    if(name === "firstName") {
      setFirstName(value);
    }
    if(name === "lastName") {
      setLastName(value);
    }
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

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    try {
      await dispatch(signUpUserHandler(body));
      toast.success("Kayıt Başarıyla Gerşekleşti!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch(error) {
      setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
    }

  }

  const onClickSubmitForAdmin = async (event) => {
    event.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      await dispatch(signUpAdminHandler(body, adminKey));
      toast.success("Kayıt Başarıyla Gerşekleşti!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch(error) {
      setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
    }

  }

  return (
    <div id="signup">
      <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Çalışan Olarak Kayıt Ol</h2>
              <div className="input-field">
                <i className="fas fa-user">
                  <FontAwesomeIcon icon={faUser}/>
                </i>
                <input type="firstName" name="firstName" placeholder="Ad" value={firstName} onChange={onChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-user">
                  <FontAwesomeIcon icon={faAddressCard}/>
                </i>
                <input type="lastName" name="lastName" placeholder="Soyad" value={lastName} onChange={onChange} />
              </div>
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
              <button className="btn-submit solid" onClick={onClickSubmitForUser}>
                {pendingApiCallUser ? <span className="spinner-border spinner-border-sm"></span> : ''}
                Kayıt Ol
              </button>
              <p className="social-text">Veya sosyal medya hesaplarınız ile kaydolun</p>
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
              <h2 className="title">Admin Olarak Kayıt Ol</h2>
              <div className="input-field">
                <i className="fas fa-user">
                  <FontAwesomeIcon icon={faUser}/>
                </i>
                <input type="firstName" name="firstName" placeholder="Ad" value={firstName} onChange={onChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-user">
                  <FontAwesomeIcon icon={faAddressCard}/>
                </i>
                <input type="lastName" name="lastName" placeholder="Soyad" value={lastName} onChange={onChange} />
              </div>
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
              <button className="btn-submit" onClick={onClickSubmitForAdmin}>
                {pendingApiCallAdmin ? <span className="spinner-border spinner-border-sm"></span> : ''}
                Kayıt Ol
              </button>
              {error == null ? <label className="alert alert-info mt-2">Admin Olarak Kayıt Olmak İçin Anahtar Bilgisi Gerekmektedir!</label> :
              <label className="alert alert-danger mt-2">{error}</label> }
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Admin Kaydı</h3>
              <p>
                Admin olarak kayıt olabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
              </p>
              <button className="btn transparent" onClick={handleSignUpClick}>
                Kayıt Ol
              </button>
            </div>
            <img src={image2} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Çalışan Kaydı</h3>
              <p>
                Çalışan olarak kayıt olabilmek için aşağıdaki butona tıklayarak bir diğer sayfaya geçiş yapabilirsiniz.
              </p>
              <button className="btn transparent" onClick={handleSignInClick}>
                Kayıt Ol
              </button>
            </div>
            <img src={image1} className="image" alt="" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;