import React from 'react';
import { useNavigate } from 'react-router-dom';

const Following = ({ user }) => {

    let navigate = useNavigate()

    return (
        <div className="following__user">
            <img src={user.followedImage} alt="" className="following__user--img" />
            <p className="following__user--username" onClick={() => navigate(`/user/${user.followedUsername}`)}>{user.followedUsername}</p>
        </div>
    );
}

export default Following;
