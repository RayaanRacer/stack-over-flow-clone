import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import decode from 'jwt-decode'
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/avatar/Avatar.jsx";
import "./Navbar.css";

function Navbar() {
  var User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  useEffect(() => {
    const token = User?.token;
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp *1000 < new Date().getTime()){
          handleLogOut()
        }
      }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);

  return (
    <nav className="nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-link">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              color="white"
              borderRadius="50%"
            >
              <Link
                to={`/Users/${User.result._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                {User.result.name.charAt(0)}
              </Link>
            </Avatar>
            <button className="nav-item nav-link" onClick={handleLogOut}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
