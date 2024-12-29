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
        commentsCount={data.commentsCount}
        isFullPost
      >
      </Post>
      <ReactMarkdown className="prose prose-p: dark:prose-invert text-justify max-w-none" children={data.text} />

      {data.tags && data.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="my-6 border-t border-gray-300 dark:border-gray-600"></div>
      <CommentsBlock postId={data._id} />
    </>
  );
};