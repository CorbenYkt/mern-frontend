import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Post } from '../components/post';
import { fetchPosts } from '../redux/slices/posts';
import { PostSkeleton } from '../components/post/Skeleton';

export const Home = () => {
    const dispatch = useDispatch();
    // const userData = useSelector((state) => state.auth.data);
    const { posts } = useSelector((state) => state.posts);

    const isPostLoading = posts.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>

            {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs> */}
            {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostLoading ? (
                    <div key={index}>
                        <PostSkeleton />
                    </div>
                ) : (
                    <div key={index}>
                        <Post
                            key={obj._id}
                            id={obj._id}
                            title={obj.title}
                            imageUrl={obj.imageUrl ? `${window.location.origin}${obj.imageUrl}` : ''}
                            user={obj.user}
                            createdAt={obj.createdAt}
                            viewsCount={obj.viewsCount}
                            commentsCount={3}
                        />
                    </div >
                )
            )}
        </>
    );
};