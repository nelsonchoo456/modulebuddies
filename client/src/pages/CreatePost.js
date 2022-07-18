import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Global/Spinner";
import { createPost, reset } from "../features/post/postSlice";
import { Box } from "@chakra-ui/react";

function CreatePost() {
  const [formData, setFormData] = useState({
    module: "",
    title: "",
    text: "",
  });

  const { module, title, text } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      text,
      module,
      title,
      user,
    };
    dispatch(createPost(postData));

    navigate("/forum");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box paddingTop={"30px"}>
        <section className="heading">
          <h1>Create your post</h1>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="module"
                name="module"
                value={module}
                placeholder="Enter your module"
                onChange={onChange}
                required="true"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                placeholder="Enter the title of your post"
                onChange={onChange}
                required="true"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="text"
                name="text"
                value={text}
                placeholder="Enter your text"
                onChange={onChange}
                required="true"
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
    </>
  );
}

export default CreatePost;
