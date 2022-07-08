import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPost, reset } from "../features/post/postSlice";
import PostComment from "../components/Comment/PostComment";
import CommentForm from "../components/Comment/CommentForm";
import CommentItem from "../components/Comment/CommentItem";
import { Box } from "@chakra-ui/react";

function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.auth);
  const { posts, post, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPost(params.id));

    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch, params.id]);

  if (post !== null) {
    return (
      <>
        <PostComment key={post._id} post={post} />
        <CommentForm postID={post._id} />
        <Box paddingBottom="100px">
          {post.comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                postID={post._id}
              />
            );
          })}
        </Box>
      </>
    );
  }
}

export default Post;
