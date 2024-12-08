import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserInfo } from '../userInfo/index';
import { FaComments } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { PostSkeleton } from './Skeleton';
// import { fetchRemovePost } from '../../redux/slices/posts';
export const Post = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const dispatch = useDispatch();

    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = () => {
        //dispatch(fetchRemovePost(id));
    };

    return (
        <div className="mb-4">
            {/* {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                />
            )} */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                />
            )}
            <UserInfo {...user} additionalText={format(new Date(createdAt), 'hh:mm a, dd MMM yyyy')} />
            <div className="text-left">
                <h2 className="text-2xl font-bold">
                    {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                </h2>
                {/* {children && <div>{children}</div>} */}
                <ul className="flex justify-end space-x-4 mt-2">
                    <li className="flex items-center space-x-2 text-gray-500">
                        <FaRegEye />
                        <span>{viewsCount}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-500">
                        <FaComments />
                        <span>{commentsCount}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
