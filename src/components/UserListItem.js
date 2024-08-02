import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const UserListItem = ({ user }) => {

    return (
        <Link to={"/profile/"+user.email} className="list-group-item list-group-item-action">

            <ProfileImage user={user.email} width={"32"} height={"32"} tempImage={user.imageUrl}/>

            <span className="px-2">
                {user.firstName} {user.lastName}  {"("}{user.email}{")"}
            </span>
        </Link>
    );
};

export default UserListItem;