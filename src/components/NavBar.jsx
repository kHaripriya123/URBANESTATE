import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user?.user); 
  // const propertyId = useSelector(state => state.property.selectedPropertyId);
  // console.log("Property ID in NavBar:", propertyId);

  const handleLogout = async () => {
    try {
      const loggedOut = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      if (loggedOut) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-logoColor flex justify-between items-center">
      {/* ✅ Logo */}
      <div className="flex items-center">
        <img className="w-24" src="https://img.freepik.com/premium-vector/blue-house-logo-with-blue-house-logo-dark-background-design_644642-194.jpg?w=2000" alt="Logo" />
        <h1 className="font-bold text-white  ml-4">URBAN ESTATE</h1>
      </div>

      {/* ✅ Navigation Links */}
      <div>
      <ul className="flex space-x-6 text-white  font-bold">

          <>
          <li>
          <Link to="/home">HOME</Link>
          </li>
            <li>
              <Link to="/property">POST PROPERTY</Link>
            </li>
            <li>
              <Link to="/profile">MY PROFILE</Link>
            </li>
            
            <li>
            <Link to="/myProperties">MY PROPERTIES</Link>

            </li>
            <li>
              <button onClick={handleLogout} className="cursor-pointer">LOGOUT</button>
            </li>
          </>
        
      </ul>
      </div>
    </div>
  );
};

export default NavBar;
