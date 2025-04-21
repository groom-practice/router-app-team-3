import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./index.css";

const BaseLayout = () => {
  return (
    <main>
      <header>
        <h1>POST PROJECT</h1>
      </header>
      <div className="mainContent">
        <div className="leftSideBar">
          <Link to="/">HOME</Link>
          <Link to="/posts">POSTS</Link>
          <button>BACK</button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default BaseLayout;
