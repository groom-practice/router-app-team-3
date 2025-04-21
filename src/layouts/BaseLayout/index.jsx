import React from "react";
import { Outlet } from "react-router-dom";

function BaseLayout() {
  return (
    <div>
      <header>
        <div>Router App</div>
        <div>
          <button>로그인</button>
        </div>
      </header>

      <div>
        <aside>
          <nav>
            <ul>
              <li>
                <a href="/">홈</a>
              </li>
              <li>
                <a href="/about">소개</a>
              </li>
              <li>
                <a href="/contact">연락처</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>

      <footer>
        <p>© 2024 Router App. All rights reserved.</p>
      </footer>
    </div>
  );
}
