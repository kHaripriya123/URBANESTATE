import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Signup from "./Signup";

const Body = () => {
    const location = useLocation();

    return (
        <div>
            {/* <NavBar /> ✅ Navbar always present */}
            
            {/* ✅ Show Signup only on "/" */}
            {location.pathname === "/" && <Signup />}
            
            <Outlet /> {/* ✅ Other pages will be loaded here */}
        </div>
    );
};

export default Body;
