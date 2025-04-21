import "./style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/posts";
import { createPortal } from "react-dom";
import PortalModalContainer from "../../components/PortalModalContainer";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  const handleFavoriteBtn = () => {
    setShowModal(true);
  };

  const cancelFavorite = () => {
    setShowModal(false);
  };

  const confirmFavorite = () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (!currentFavorites.includes(String(id))) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...currentFavorites, String(id)])
      );
    }
    setShowModal(false);
  };

  if (!post) return <div className="post-detail-container">로딩중입니다</div>;
  return (
    <div className="post-detail-container">
      <h1>Post Id: {id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <div className="post-detail-buttons">
        <Link to={`/posts/${id}/edit`}>Edit</Link>
        <button onClick={handleFavoriteBtn}>즐겨찾기</button>
      </div>

      {showModal &&
        createPortal(
          <PortalModalContainer>
            <div className="favorite-modal">
              <h3>아이디 = {id}인 게시글을 즐겨찾기에 추가?</h3>
              <div className="favorite-modal-buttons">
                <button onClick={confirmFavorite}>확인</button>
                <button onClick={cancelFavorite}>취소</button>
              </div>
            </div>
          </PortalModalContainer>,
          document.body
        )}
    </div>
  );
}
