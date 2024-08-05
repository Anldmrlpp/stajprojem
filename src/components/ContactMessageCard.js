import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMessage } from "../api/apiCalls";
import '../style/Components.css';

const ContactMessageCard = ({ message }) => {

    const { statuses } = useSelector((store) => ({
        statuses: store.statuses
    }));

    const onClickDelete = async () => {
        try {
            await deleteMessage(message.id);
            window.location.reload();
        } catch(error) {

        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    let cardType = (
        <div id="message-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link className="card-link nav-link">
                    <div className="card-body">
                        <h5 className="card-title">{message.subject}</h5>
                        <hr className="my-2" />
                        <p className="card-text mb-2"><span className="fw-bold">İsim:</span> {message.name} {"("}{message.email}{")"} </p>
                        <p className="card-text"><span className="fw-bold">Mesaj:</span> {message.message}</p>
                        <p className="card-text"><span className="fw-bold">Tarih:</span> {formatDate(message.createdDate)}</p>
                        {statuses === "ADMIN" &&
                            <Link className="btn btn-danger" onClick={onClickDelete}>Sil</Link>
                        }
                    </div>
                </Link>
            </div>
        </div>

    )

    return(
        <div className={`mb-4 card-padding card-for-permission col-md-4`}>
            {cardType}
        </div>
    );
}

export default ContactMessageCard;