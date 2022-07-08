// import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import AuthNavbar from "../Navbar/AuthNavbar";
import UnauthNavbar from "../Navbar/UnauthNavbar";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return <>{user ? <AuthNavbar /> : <UnauthNavbar />}</>;
}

export default Header;
