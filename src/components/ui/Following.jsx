import React from 'react';
import { Link } from 'react-router-dom';

const Following = ({ user }) => {
    return (
        <div className="following__user">
            <img src={user.followedImage} alt="" className="following__user--img" />
            <a href={`/user/${user.followedUsername}`}>
                <p className="following__user--username">{user.followedUsername}</p>
            </a>
        </div>
    );
}

export default Following;
