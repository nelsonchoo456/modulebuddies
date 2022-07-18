import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Global/Spinner";
import { createPost, reset } from "../features/post/postSlice";
import { Box, Input } from "@chakra-ui/react";
import axios from "axios";

function CreatePost() {
  const [formData, setFormData] = useState({
    module: "",
    title: "",
    text: "",
  });

  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      text,
      module,
      title,
      user,
    };
    dispatch(createPost(postData));

    navigate("/forum");

    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("id", user._id);
    newFormData.append("title", title);

    try {
      const res = await axios.post("/upload", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (error) {
      if (error.response.status === 500) {
        console.log("error with server");
      } else {
        console.log(error.response.data.msg);
      }
    }
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
            <Box paddingBottom="20px">
              <Input
                placeholder="Upload Image"
                size="md"
                backgroundColor="#ffffff"
                type="file"
                paddingBottom="20px"
                onChange={uploadFile}
              />
            </Box>
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
