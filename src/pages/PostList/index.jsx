import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts } from "../../apis/posts";
import "./index.css";
import PortalModalContainer from "../../components/PortalModalContainer";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  const loaderRef = useRef(null);

  // 모든 게시글 로딩 + 즐겨찾기 상단 정렬
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const res = await getAllPosts();
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const favoritePosts = res.filter((post) =>
          favorites.includes(String(post.id))
        );
        const otherPosts = res.filter(
          (post) => !favorites.includes(String(post.id))
        );

        setPosts([...favoritePosts, ...otherPosts]);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // 무한 스크롤
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) => {
          if (prev < posts.length) {
            return prev + 10;
          } else {
            return prev;
          }
        });
      }
    },
    [posts.length]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  // 삭제 핸들링
  const handleDelete = async () => {
    if (openModal === null) return;
    setIsDeleting(true);
    try {
      await deletePost(openModal);
      setPosts((prev) => prev.filter((p) => p.id !== openModal));
    } catch (err) {
      console.error("삭제 실패:", err);
    } finally {
      setIsDeleting(false);
      setOpenModal(null);
    }
  };

  return (
    <section className="postListSection">
      <h3>Posts List</h3>

      {isLoading ? (
        <div className="loading-container">로딩중입니다...</div>
      ) : (
        <>
          <ul>
            {posts.slice(0, visibleCount).map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  {post.id}. {post.title}
                </Link>
                <button onClick={() => setOpenModal(post.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div ref={loaderRef} className="scroll-loader" />
        </>
      )}

      {openModal &&
        createPortal(
          <PortalModalContainer>
            <div className="deleteModal">
              <h3>Are you sure you want to delete id={openModal} post?</h3>
              <div className="btns">
                <button onClick={handleDelete} disabled={isDeleting}>
                  Yes
                </button>
                <button
                  onClick={() => setOpenModal(null)}
                  disabled={isDeleting}
                >
                  No
                </button>
              </div>
            </div>
          </PortalModalContainer>,
          document.body
        )}
    </section>
  );
}
