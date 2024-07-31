import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
  return (
    <div className="container mt-5">
      <h2>İletişim Formu</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">İsim</label>
          <input type="text" className="form-control" id="name" placeholder="İsminizi girin" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email adresinizi girin" />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Konu</label>
          <input type="text" className="form-control" id="subject" placeholder="Konu" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Mesaj</label>
          <textarea className="form-control" id="message" rows="3" placeholder="Mesajınızı girin"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
};

export default ContactForm;
