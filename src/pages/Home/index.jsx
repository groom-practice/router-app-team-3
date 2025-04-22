import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./index.css";

function LoginModal({ onClose, onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    onLogin(id);
    onClose();
  };

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="loginModalInner">
          <p>로그인</p>
          <input
            type="text"
            placeholder="id : test123"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="pw : test123password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <div className="btns">
            <button onClick={onClose}>취소</button>
            <button onClick={handleLogin}>로그인</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = (userId) => {
    setLoggedInUser(userId);
  };

  return (
    <div className="home">
      {loggedInUser && (
        <p className="welcomeMessage">{loggedInUser}님 반갑습니다</p>
      )}
      <h3>Welcome To Main Page!</h3>
      <button onClick={openModal}>로그인</button>
      {showModal && <LoginModal onClose={closeModal} onLogin={handleLogin} />}
    </div>
  );
}

export default Home;
