import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./index.css";

function LoginModal({ onClose }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

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
            <button>로그인</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <h3>Welcome To Main Page!</h3>
      <button onClick={openModal}>로그인</button>
      {showModal && <LoginModal onClose={closeModal} />}
    </div>
  );
}

export default Home;
