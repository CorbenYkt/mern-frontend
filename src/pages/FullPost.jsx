import React from "react";
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import axios from '../axios';
import ReactMarkdown from "react-markdown";
import { PostSkeleton } from '../components/post/Skeleton';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      })
  }, [id]);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${window.location.origin}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        isFullPost
      >
      </Post>
      <ReactMarkdown children={data.text} />
    </>
  );
};
