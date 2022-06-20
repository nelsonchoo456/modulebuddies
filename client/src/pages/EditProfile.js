import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile, getProfile } from "../features/profile/profileSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    major: "",
    bio: "",
  });

  const { major, bio } = formData;

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());

    setFormData({
      major: !profile.major ? "" : profile.major,
      bio: !profile.bio ? "" : profile.bio,
    });
  }, [dispatch, profile.major, profile.bio]);

  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      major,
      bio,
    };

    dispatch(createProfile(profileData));
    setFormData("");
    navigate("/profile");
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
        <h1>Edit your profile</h1>
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

export default EditProfile;
