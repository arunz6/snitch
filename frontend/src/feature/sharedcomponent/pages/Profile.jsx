import React from 'react';
import './Profile.css';

// Static user data (could be replaced with props or API call later)
const user = {
  _id: '6a47ea74c4d29fb7a6b6402d',
  email: 'arunrajput88176894@gmail.com',
  contact: '8817689479',
  fullname: 'arun rajput',
  role: 'seller',
};

const Profile = () => {
  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1 className="profile-name">{user.fullname}</h1>
        <p className="profile-role">Role: {user.role}</p>
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>ID:</strong> {user._id}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
 
        