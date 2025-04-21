import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./index.css";

const BaseLayout = () => {
  const navigate = useNavigate();

  return (
    <main>
      <header>
        <h1>POST PROJECT</h1>
      </header>
      <div className="mainContent">
        <div className="leftSideBar">
          <Link to="/">HOME</Link>
          <Link to="/posts">POSTS</Link>
          <button onClick={() => navigate(-1)}>BACK</button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default BaseLayout;
