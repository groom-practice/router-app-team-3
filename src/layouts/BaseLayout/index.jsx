import React from "react";
import { Outlet } from "react-router-dom";
import { createPortal } from "react-dom";

function BaseLayout() {
  const [showModal, setShowModal] = React.useState(false);

  function handleLoginClick() {
    setShowModal(true);
  }

  function handleCancelClick() {
    setShowModal(false);
  }

  return (
    <div>
      <header>
        <div>Router App</div>
        <div>
          <button onClick={handleLoginClick}>로그인</button>
        </div>
      </header>

      <div>
        <aside>
          <nav>
            <ul>
              <li>
                <a href="/">홈</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>

      <footer>
        <p></p>
      </footer>

      {showModal &&
        createPortal(
          <div
            onClick={function (e) {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div>
              <h2>로그인</h2>
              <div>
                <label>이름</label>
                <input type="text" placeholder="아이디를 입력하세요" />
              </div>
              <div>
                <button onClick={handleCancelClick}>취소</button>
                <button>로그인</button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default BaseLayout;
