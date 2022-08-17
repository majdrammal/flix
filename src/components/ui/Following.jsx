import React from 'react';
import { Link } from 'react-router-dom';

const Following = ({ user }) => {
    return (
        <div className="following__user">
            <img src={user.followedImage} alt="" className="following__user--img" />
            <Link to={`/user/${user.followedUsername}`}>
                <p className="following__user--username" onClick={() => document.querySelector(".account__following").classList.remove("following__open")}>{user.followedUsername}</p>
            </Link>
        </div>
    );
}

export default Following;
