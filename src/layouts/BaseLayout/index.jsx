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
      <section className="mainContent">
        <nav className="leftSideBar">
          <Link to="/">HOME</Link>
          <Link to="/posts">POSTS</Link>
          <button onClick={() => navigate(-1)}>BACK</button>
        </nav>
        <Outlet />
      </section>
    </main>
  );
};

export default BaseLayout;
