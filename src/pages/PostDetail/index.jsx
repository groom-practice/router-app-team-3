import "./style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/posts";
import { createPortal } from "react-dom";

// const POST = { id: 1, title: "dumpTest", body: "asdfasdfasdfasdfasdf" };
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
      <h1>현재 포스트의 포스트 아이디는 {id}입니다.</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <div className="post-detail-buttons">
        <Link to={`posts/${id}/edit`}>Edit</Link>
        <button onClick={handleFavoriteBtn}>즐겨찾기</button>
      </div>

      {
        (showModal &&
          createPortal(
            <PortalModalContainer>
              <h3>아이디:{id}인 게시글을 즐겨찾기에 추가</h3>
              <button onClick={confirmFavorite}>확인</button>
              <button onClick={cancelFavorite}>취소</button>
            </PortalModalContainer>
          ),
        document.body)
      }
    </div>
  );
}
