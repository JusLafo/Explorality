import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Login</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Get Started
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="user-profile to-my-profile-button">
      <Link to={`/users/${user?.id}`} className="to-my-profile-button gradient-hover-effect">
        to my profile
      </Link>
    </li>,
    <li key="sign-out top-bar-home-button">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
          <li>
            <Link to="/" className="top-bar-home-button gradient-hover-effect">Home</Link>
          </li>
      </div>
      <div className="top-bar-right">
        <li className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</li>
      </div>
    </div>
  );
};

export default TopBar;
