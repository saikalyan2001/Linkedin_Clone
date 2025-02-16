import React, { useMemo, useState } from 'react';
import { getSingleSatus, getSingleUser } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard';
import { useLocation } from 'react-router-dom';
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllstatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  useMemo(() => {
    if (location?.state?.id) {
      getSingleSatus(setAllstatus, location?.state?.id);
    }
    
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  return (
    <>
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Edit</button>
      </div>
      <div className="profile-info">
        <div>
          <h3 className="userName">
            { Object.values(currentProfile).length === 0 
               ? currentUser.name 
               : currentProfile?.name}
          </h3>
          <p className="heading">
            { Object.values(currentProfile).length === 0 
               ? currentUser.headline 
               : currentProfile?.headline}          
          </p>
          <p className="location">
            { Object.values(currentProfile).length === 0 
               ? currentUser.location 
               : currentProfile?.location} 
          </p>
        </div>

        <div className="right-info">
          <p className="college">{ currentUser.college }</p>
          <p className="company">{ currentUser.company }</p>
        </div>
      </div>
    </div>

    <div className="post-status-main">
      {allStatuses
      .filter((item) => {
        return item.userEmail === localStorage.getItem("userEmail")
      })
      .map((posts) => {
        return (
        <div key={posts.id}>
          <PostsCard posts={posts} />
        </div>
        );
      })}      
    </div>
    </>
  );
}