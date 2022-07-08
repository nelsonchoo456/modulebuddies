import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts, reset } from "../features/post/postSlice";
import PostItem from "../components/Forum/PostItem";
import { Heading } from "@chakra-ui/react";

function Forum() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch]);

  const onClick = () => {
    navigate("/create-post");
  };

  return (
    <>
      <Heading as="h2" marginTop="5" marginBottom="5">
        Welcome to the forum!
      </Heading>
      <div className="form-group">
        <button type="submit" className="btn btn-block" onClick={onClick}>
          Create new post
        </button>
      </div>
      <div className="goals">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Forum;
