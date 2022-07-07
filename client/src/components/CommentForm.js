import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, reset } from "../features/post/postSlice";

function CommentForm({ postID }) {
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const textObj = { text };

    dispatch(addComment({ postID, textObj }));
    setText("");
  };
  return (
    <Box>
      <section className="heading">
        <h1>Leave a comment</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="comment"
              name="comment"
              value={text}
              placeholder="Enter a comment"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </Box>
  );
}

export default CommentForm;
