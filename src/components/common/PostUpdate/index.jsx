import React, { useMemo, useState } from 'react';
import { getStatus, postStatus } from '../../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import ModalComponent from '../Modal';
import { getUniqueID } from '../../../helpers/getUniqueid';
import PostsCard from '../PostsCard';
import "./index.scss";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllstatus] = useState([]);
  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
  };
  
  useMemo(() => {
    getStatus(setAllstatus);
  }, []);
  
  
  return (
  <div className="post-status-main">
    <div className="post-status">
      <button className="open-post-modal" onClick={() => setModalOpen(true)}>Start a Post</button>
    </div>
    <ModalComponent 
    modalOpen={modalOpen} 
    setModalOpen={setModalOpen} 
    setStatus={setStatus}
    status={status}
    sendStatus={sendStatus}
    />
    
    <div>
      {allStatuses.map((posts) => {
        return (
          <div key={posts?.id}>
            <PostsCard posts={posts} />
          </div>
          );
      })}
    </div>
    </div>
  )
}
