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

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const { module, title, text } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
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

    const avatar = profile.profile.avatar;

    const postData = {
      text,
      module,
      title,
      user,
      url,
      avatar,
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

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "module-buddies");
    data.append("cloud_name", "nelsonchoo456");
    fetch("https://api.cloudinary.com/v1_1/nelsonchoo456/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        toast.success("Image Uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-block"
                onClick={() => postDetails()}
              >
                Upload Image
              </button>
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
