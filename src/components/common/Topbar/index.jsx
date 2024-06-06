import React, { useState } from 'react';
import LinkedinLogo from "../../../assests/linkedinlogo.png";
import user from "../../../assests/user.png";
import { AiOutlineHome,AiOutlineUser,AiOutlineSearch,AiOutlineMessage,AiOutlineBell } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';

export default function Topbar() {
  const [popupVisible, setPopupVisible] = useState(false);
    let navigate = useNavigate();
    const goToRoute = (route) => {
        navigate(route);
    };

    const displayPopup = () => {
      setPopupVisible(!popupVisible);
    };

  return (
  <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
    <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
    <div className="react-icons">
        <AiOutlineSearch size={30} className="react-icon" />
        <AiOutlineHome size={30} className="react-icon" 
           onClick={() => goToRoute("/home")}
        />
        <AiOutlineUser size={30} className="react-icon"
          onClick={() => goToRoute("/profile")} 
        />
        <BsBriefcase size={30} className="react-icon" />
        <AiOutlineMessage size={30} className="react-icon" />
        <AiOutlineBell  size={30} className="react-icon" />
    </div>
    <img className="user-logo" src={user} alt="user" onClick={displayPopup}
/>
  </div>
  );
}
