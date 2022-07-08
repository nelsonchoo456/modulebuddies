import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../features/profile/profileSlice";

function CreateProfileForm() {
  const [formData, setFormData] = useState({
    major: "",
    bio: "",
  });

  const { major, bio } = formData;

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      major,
      bio,
    };

    dispatch(createProfile(profileData));
    setFormData("");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section className="heading">
        <h1>Create your profile</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="major"
              name="major"
              value={major}
              placeholder="Enter your major"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={bio}
              placeholder="Enter bio"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateProfileForm;
