import { useNavigate, useParams } from 'react-router-dom'
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostById, updatePost } from '../../apis/post';
import PostForm from '../../components/PostForm';
import './index.css'

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  const handleUpdate = async (data) => {
    await updatePost(id, data).then((res) => console.log(res));
    navigate(`/posts/${id}`);
  };

  if(!post) return <div className='postFormContainer'>....Loading</div>;
  
  return(
    <div className='postFormContainer'>
      <h2>Edit Post Id : {id}</h2>
      <p className='lastEditPostIdText'>
        마지막으로 수정한 post id : 
      </p>
      <PostForm onSubmit={handleUpdate} initialValues={post} />
    </div>
  )

}