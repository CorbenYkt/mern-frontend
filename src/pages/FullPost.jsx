import React from "react";
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import axios from '../axios';
import ReactMarkdown from "react-markdown";
import { PostSkeleton } from '../components/post/Skeleton';
import { CommentsBlock } from "../components/CommentsBlock";

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
        imageUrl={data.imageUrl ? `${'https://mern.corbenykt.ru' + data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        isFullPost
      >
      </Post>
      <div className="my-6">
        <ReactMarkdown className="prose prose-sm dark:prose-invert" children={data.text} />
      </div>

      <div className="my-6 border-t border-gray-300 dark:border-gray-600"></div>
      <CommentsBlock postId={data._id} />
    </>
  );
};
