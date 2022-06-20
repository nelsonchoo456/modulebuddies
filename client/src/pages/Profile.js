import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreateProfileForm from "../components/CreateProfileForm";
import Spinner from "../components/Spinner";
import { getProfile, reset } from "../features/profile/profileSlice";
import { Button } from "@chakra-ui/react";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(getProfile());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return profile == null ? (
    <CreateProfileForm />
  ) : (
    <>
      <div>{user.name}</div>
      <div>{profile.major}</div>
      <div>{profile.bio}</div>
      <img src={profile.user.avatar} alt="User Profile" />
      <Button as={"a"} variant={"link"} href="/edit-profile">
        Edit Profile
      </Button>
    </>
  );
}

export default Profile;
