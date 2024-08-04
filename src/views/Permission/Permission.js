import React from "react";
import UserList from "../../components/UserList";
import PermissionFeed from "../../components/PermissionFeed";

const Permission = () => {
    return(
        <div className="container mt-5">
           <div className="row">
                <UserList />
            </div>
            <div className="row mt-5">
                <PermissionFeed cardLocation="PermissionPage" />
            </div>

        </div>
    );
}

export default Permission;