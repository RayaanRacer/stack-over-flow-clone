import React, { useState } from "react";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import Avatar from "../../components/avatar/Avatar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faBirthdayCake, faPen} from "@fortawesome/free-solid-svg-icons"
import moment from 'moment'
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import './UserProfile.css'


function UserProfile() {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentUserProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false)
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                px="40px"
                py="30px"
                color="white"
                fontSize={'50px'}
              >
                {currentUserProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentUserProfile?.name}</h1>
                <p><FontAwesomeIcon icon={faBirthdayCake}/> Joined {moment(currentUserProfile?.joinedOn).fromNow()}</p>
              </div>
            </div>
            {
              currentUser?.result?._id === id && (
                <button onClick={()=>setSwitch(true)} className="edit-profile-btn">
                  <FontAwesomeIcon icon={faPen}/> Edit Profile
                </button>
              )
            }
          </div>
          {
            Switch ? (
                <EditProfileForm currentUser={currentUser} 
                setSwitch={setSwitch}/>
            ) : (
              <ProfileBio currentUserProfile={currentUserProfile}/>
            )
          }
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
