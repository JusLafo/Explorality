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
    <li key="user-profile">
      <Link to={`/users/${user?.id}`}>
        to my profile
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
          <li className="">
            <Link to="/" className="top-bar-home-button gradient-hover-effect">Home</Link>
          </li>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
