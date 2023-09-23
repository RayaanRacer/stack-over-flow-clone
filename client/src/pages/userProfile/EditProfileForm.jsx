import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./UserProfile.css";
import { updateUser } from "../../actions/users";
function EditProfileForm({ currentUser, setSwitch }) {
  const [name, setName] = useState(currentUser?.result.name);
  const [about, setAbout] = useState(currentUser?.result.about);
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
//   console.log(currentUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (tags.length === 0) {
      dispatch(
        updateUser(currentUser?.result?._id, {
          name,
          about,
          tags: currentUser?.result?.tags,
        })
      );
    } else {
      dispatch(
        updateUser(currentUser?.result?._id, {
          name,
          about,
          tags,
        })
      );
    }
    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            name="about"
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags Separeted by One Space</p>
          <input
            type="text"
            name="tags"
            id="tags"
            
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input
          type="submit"
          value="Save Profile"
          className="userProfile-save-btn"
        />
        <button
          type="button"
          className="userProfile-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
