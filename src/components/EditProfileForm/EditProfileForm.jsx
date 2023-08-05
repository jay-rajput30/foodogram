import React, { useState } from "react";
import styles from "./EditProfileForm.module.css";
import { avatars } from "../../utils/utls,";
import { updateProfile } from "../../../backend/controllers/profile.controller";
import { usePost } from "../../context/PostProvider";

const EditProfileForm = ({ profile, setShowEditForm }) => {
  const [editProfileFormData, setEditProfileFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    profileImg: profile.profileImg,
    bio: profile.bio,
    portfolioUrl: profile.portfolioUrl,
  });
  const { setPostToggle } = usePost();
  const editProfileFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { success, data } = await updateProfile(
        profile.userId,
        editProfileFormData
      );
    } catch (e) {
      console.error(e.message);
    }
    setPostToggle((prev) => !prev);
    setShowEditForm(false);
  };
  ({ editProfileFormData });
  return (
    <div className={styles.EditProfileFormWrapper}>
      <h2>Edit Profile</h2>
      <form onSubmit={editProfileFormSubmitHandler}>
        <div className={styles.editFormAvatarRadioWrapper}>
          <p>select avatar</p>
          <div className={styles.editFormAvatarRadioGroup}>
            {avatars.map((item, idx) => {
              return (
                <label className={styles.editFormAvatarRadioItem} key={idx}>
                  <input
                    type="radio"
                    name="avatar-group"
                    value={item}
                    checked={editProfileFormData.profileImg === item}
                    onChange={(e) =>
                      setEditProfileFormData({
                        ...editProfileFormData,
                        profileImg: e.target.value,
                      })
                    }
                  />
                  <img src={item} alt={item} />
                </label>
              );
            })}
          </div>
        </div>
        <input
          type="text"
          placeholder="enter your new first name"
          value={editProfileFormData.firstName}
          onChange={(e) =>
            setEditProfileFormData({
              ...editProfileFormData,
              firstName: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="enter your new last name"
          value={editProfileFormData.lastName}
          onChange={(e) =>
            setEditProfileFormData({
              ...editProfileFormData,
              lastName: e.target.value,
            })
          }
        />
        <textarea
          placeholder="enter your new bio"
          value={editProfileFormData.bio}
          onChange={(e) =>
            setEditProfileFormData({
              ...editProfileFormData,
              bio: e.target.value,
            })
          }
        ></textarea>
        <input
          type="text"
          placeholder="enter new portfolio url"
          value={editProfileFormData.portfolioUrl}
          onChange={(e) =>
            setEditProfileFormData({
              ...editProfileFormData,
              portfolioUrl: e.target.value,
            })
          }
        />
        <div className={styles.editFormButtonWrapper}>
          <button type="submit">update</button>
          <button onClick={() => setShowEditForm(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
