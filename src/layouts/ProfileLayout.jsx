import React, { useMemo, useState } from 'react';
import Profile from '../Pages/Profile';
import Topbar from '../components/common/Topbar';
import { getCurrentUser } from '../api/FirestoreAPI'; 

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);
    return (
    <div>
        <Topbar />
        <Profile currentUser={currentUser} />
    </div>
    );
}
