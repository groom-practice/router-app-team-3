import { useNavigate, useParams } from 'react-router-dom'
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostById, updatePost } from '../../apis/post';
import PostForm from '../../components/PostForm';

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [lastEditedPostId, setLastEditedPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  useEffect(() => {
    const savedId = localStorage.getItem('lastEditedPostId');
    if (savedId) {
      setLastEditedPostId(savedId);
    }
  }, []);

  const handleUpdate = async (data) => {
    await updatePost(id, data).then((res) => {
      console.log(res);
      localStorage.setItem('lastEditedPostId', id);
    });
    navigate(`/posts/${id}`);
  };

  if(!post) return <div className='postLoadedContainer'>....Loading</div>;
  
  return(
    <div className='postLoadedContainer'>
      <h2>Edit Post Id : {id}</h2>
      <p className='lastEditPostId'>
        마지막으로 수정한 post id : {lastEditedPostId || '없음'}
      </p>
      <PostForm onSubmit={handleUpdate} initialValues={post} />
    </div>
  )

}