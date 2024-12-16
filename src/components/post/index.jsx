import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserInfo } from '../userInfo/index';
import { FaComments } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    isFullPost,
    isLoading,
}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.data);

    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = () => {
        dispatch(fetchRemovePost(id));
    };

    const isAuthor = currentUser?._id === user._id;
    return (
        <div className="mb-4">
            {isFullPost && imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                />
            )}
            <br />
            <ul className="flex justify-start space-x-4 mt-2">
                <li className="flex items-center text-gray-500">
                    <UserInfo {...user} additionalText={format(new Date(createdAt), 'hh:mm a, dd MMM yyyy')} />
                </li>

            </ul>

            <div className="text-left">
                <h2 className="text-2xl font-bold">
                    {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                </h2>
                <ul className="flex justify-start space-x-2 mt-2">
                    <li className="flex items-center space-x-2 text-gray-500">
                        <FaRegEye />
                        <span>{viewsCount}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-500">
                        <FaComments />
                        <span>{commentsCount}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-500">
                        {isAuthor && (
                            <div className="flex space-x-2 mb-2">
                                <Link to={`/posts/${id}/edit`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    Edit
                                </Link>
                                <button
                                    onClick={onClickRemove}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                    </li>
                </ul>
            </div>
        </div>
    );
};
