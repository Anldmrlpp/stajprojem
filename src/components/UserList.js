import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { useApiProgress } from "../shared/ApiProgress";
import { getUsers } from "../api/apiCalls";
import Spinner from "./Spinner";

const UserList = () => {

    const [page, setPage] = useState({
        content : [],
        size : 3,
        number : 0
    });

    const pendingApiCall = useApiProgress('get','/api/v1/employee/allEmployees?page=');

    useEffect(() => {
        loadPage();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;

        loadPage(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;

        loadPage(previousPage);
    }

    const loadPage = (pageNumber) => {
        getUsers(pageNumber).then(response => {
            setPage(response.data);
        });
    }

    const { content : users, last, first } = page;

    let actionDiv = (
        <div>
                {first === false &&
                    <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
                        Geri
                    </button>
                }
                {last === false &&
                    <button className="btn btn-sm btn-light float-end" onClick={onClickNext}>
                        İleri
                    </button>
                }
        </div>
    );

    if(pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    }

    return(
        <div className="card">
            <h3 className="card-header text-center">Çalışanlar</h3>
            <div className="list-group list-group-flush">
                {
                    users.map(user => (
                        <UserListItem  key={user.username} user={user}/>
                    ))
                }
            </div>
            {actionDiv}
        </div>
    );
}

export default UserList;