import { useSelector } from "react-redux";
import { selectPostIds, getPostStatus, getPostError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{postError}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
