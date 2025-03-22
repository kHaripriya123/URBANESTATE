import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./Body";
import Login from "./Login";
import appStore from "../utils/appStore";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Feed from "./Feed";
import PropertyForm from "./PropertyForm";
import MyProperties from "./MyProperties";
// import Chat from "./Chat";

const App = () => {
    return (
        <Provider store={appStore}>
             {/* <Chat senderId="65fc1234567890" receiverId="65fc0987654321" senderName="Owner" receiverName="Agent" /> */}
            <BrowserRouter>
            <NavBar/>
                <Routes>
                    {/* ✅ Public Routes */}
                    <Route path="/" element={<Body />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                    </Route>

                    {/* ✅ Private Route for Home */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/Home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/feed"  element={<Feed/>} />
                        <Route path ="/property" element={<PropertyForm/>}/>
                        <Route path ="/myProperties" element={<MyProperties/>}/>
                        
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
