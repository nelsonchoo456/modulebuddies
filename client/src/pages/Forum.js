import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts, reset } from "../features/post/postSlice";
import PostItem from "../components/Forum/PostItem";
import { Heading, Input } from "@chakra-ui/react";
import { getProfile } from "../features/profile/profileSlice";

function Forum() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());

    dispatch(getProfile());

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
      <div className="search bar">
        <Input
          type="text"
          placeholder="Search Module"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="goals">
        {posts
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.module?.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
      </div>
    </>
  );
}

export default Forum;
