import React, { useState } from 'react';
import './Contact.css';
import { useSelector } from 'react-redux';
import { createContact } from '../../api/apiCalls';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useApiProgress } from '../../shared/ApiProgress';

const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const [error, setError] = useState(null);

    const { statuses } = useSelector((store) => ({
        statuses: store.statuses
    }));

    const pendingApiCall = useApiProgress('post','/api/v1/contacts/create');

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "name") {
            setName(value);
        }
        if(name === "email") {
            setEmail(value);
        }
        if(name === "subject") {
            setSubject(value);
        }
        if(name === "message") {
            setMessage(value);
        }

        setError(null)
    }

    const onClick = async (event) => {
        event.preventDefault();

        const body = {
            name,
            email,
            subject,
            message
        }

        try {
            await createContact(body);
            toast.success("Mesajınız Sisteme İletildi. Teşekkürler!");

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    return ( 
        <div id='contact' className="container-fluid row justify-content-center align-items-center">
            <header className="text-center mb-5 col-md-12">
                <h1 className="text-center mb-4">BİZE ULAŞIN</h1>
                <div className="title-wrapper">
                </div>
            </header>
            <div className="col-md-12 ps-4">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-4">
                        <div className="content-form ps-5 contact-text-style">
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faMapMarker} size="2x" />
                                </div>
                                <div>
                                    <h2>Adres</h2>
                                    <p>
                                      YTÜ-Davutpaşa Kampüsü A2 <br />
                                      34220 <br />
                                      Esenler/İstanbul
                                    </p>
                                </div>
                            </section>
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faPhone} size="2x" />
                                </div>
                                <div>
                                    <h2>Telefon</h2>
                                    <p>0(212) 924 20 30</p>
                                </div>
                            </section>
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                </div>
                                <div>
                                    <h2>E-mail</h2>
                                    <p>kts@kafein.com.tr</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-wrapper">
                            <form className="form d-flex flex-column align-items-center offset-md-2">
                                <div className="input-wrapper mb-3 d-flex">
                                    <input type="text" className="form-control me-2" placeholder="Adınız" required name="name" onChange={onChange} value={name} />
                                    <input type="email" className="form-control" placeholder="E-mail" required name="email" onChange={onChange} value={email} />
                                </div>
                                <div className="input-wrapper mb-3 d-flex">
                                    <input type="text" className="form-control" placeholder="Konu" style={{width:'413px'}} required name="subject" onChange={onChange} value={subject} />
                                </div>
                                <div className="input-wrapper mb-3 d-flex">
                                    <textarea className="form-control col" style={{ width: '413px', height:"250px" }} placeholder="Mesajınızı Yazınız...." required name="message" onChange={onChange} value={message}></textarea>
                                </div>
                                <div className="button-wrapper mt-3" >
                                    <button name="submit" className="btn btn-primary" style={{width:'413px'}} disabled={statuses !== "ADMIN" && statuses !== "EMPLOYEE"} onClick={onClick}>
                                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                        Gönder
                                    </button>
                                </div>
                                {(statuses !== "ADMIN" && statuses !== "EMPLOYEE") &&
                                    <label className="alert alert-info ms-1 mt-4">Mesajınızı iletmek için sisteme Giriş Yapmalısınız!</label>
                                }
                                {error != null && <label className="alert alert-danger ms-5">{error}</label> }
                                
                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
 
export default Contact;