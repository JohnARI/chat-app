import React from "react";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default Header;
