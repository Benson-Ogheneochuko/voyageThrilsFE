import { useEffect } from "react"
import { fetchUserProfile } from "./userService"
import { userProfileState } from "../globalState/userState"

export const UserProfile = () => {
  const user = userProfileState(state => state.user)

  useEffect(() => {
    const loadUserProfile = async () => {
      if (Object.keys(user).length === 0) {
        fetchUserProfile();
      }
    };
    loadUserProfile();
  }, [user]);

  // useEffect(() => {
  //   console.log(user); // Logs the user state after it has been updated
  // }, [user]);

  const profileCard = {
    border: 'solid 1px',
    borderRadius: '.8rem',
    padding: '1.25rem'
  }

  return (
    <div style={profileCard} className="profileCard">
      <span data-id-1234>User image</span>
      <p>{user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : 'USER NAME'}</p>
      <p>{user.email ?? 'email'}</p>
      <p>{user.joinDate ?? 'Join date'}</p>
    </div>
  );

}