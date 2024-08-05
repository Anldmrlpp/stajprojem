import React, { useEffect, useState } from "react";
import { gettAllMessage } from "../api/apiCalls";
import ContactMessageCard from "./ContactMessageCard";
import { useApiProgress } from "../shared/ApiProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Spinner from "./Spinner";

const ContactMessageFeed = () => {

    const [message, setMessage] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState();

    const pendingApiCall = useApiProgress('get','/api/v1/contacts/getpage?page=');

    const pageSize = 12;
    const sort = "createdDate,DESC";

    const fetchMessages = async (pageNumber, pageSize, pageSort) => {
        const previousMessages = [...message];

        try {
            const response = await gettAllMessage(pageNumber, pageSize, pageSort); 
            const data = response.data.content;
            setIsLastPage(response.data.last);
            setPageNumber(response.data.pageable.pageNumber);
            setIsThereData(response.data.totalElements);
            const convertedMessages = data.map(message => ({
                id: message.id,
                name: message.name,
                email: message.email,
                subject: message.subject,
                message: message.message,
                createdDate: message.createdDate,
                updatedDate: message.updatedDate
            }));

            const combinedMessages = [...previousMessages, ...convertedMessages];
            setMessage(combinedMessages);

        } catch(error) {
            console.log("HATAA")
        }
    }

    useEffect(() => {
        fetchMessages(pageNumber, pageSize, sort);
    }, []);

    const onClickLoadMoreCardButton = () => {
        fetchMessages(pageNumber + 1, pageSize, sort);
    }

    if(isThereData === 0) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Herhangi Bir Mesaj Bulunmamaktadır...</p>
          </div>
        );
    }

    if(message.length == 0) {
        return (
          <Spinner />
        );
    }

    return(
        <div id="card-feed">
            <div className="row mt-5">
                <h3 className="card-header text-center mt-5 mb-2">Mesajlar</h3>
                <hr className="mb-5" />
                {message.map((message, index) => (
                    <ContactMessageCard key={index} message={message} />
                ))}
                <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                    Daha Fazla Göster
                </button>
            </div>
        </div>
    );
}

export default ContactMessageFeed;