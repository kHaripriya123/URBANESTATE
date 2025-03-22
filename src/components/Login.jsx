import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userLogin = async () => {
    try {
      const response = await axios.post(BASE_URL + "/login", formData, {
        withCredentials: true,
      });

      console.log("API Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token saved in localStorage:", localStorage.getItem("token"));

        
        dispatch(addUser(response.data))
        navigate("/Home", { replace: true });

      } else {
        console.log("No token received!");
      }
    } catch (error) {
      // console.error("Login error:", error.response?.data || error);
      setError(error.response?.data || "Login failed!");
    }
  };



  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          
          className="mb-4 grid h-28 place-items-center bg-logoColor"
        >
          <Typography variant="h3" className="text-white" >
            LOGIN
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 " >
          <Input
            label="Email"
            size="lg"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="bg-logoColor border border-black"
            
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-white"
          />
          {error && (
            <Typography color="red" className="text-center">
              {error}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0  ">
          <Button   className="bg-logoColor text-white"  fullWidth onClick={userLogin}>
            LOGIN
          </Button>
          {/* <Typography variant="small" className="mt-6 flex justify-center text-logoColor">
            New User?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="black"
              className="ml-1 font-bold text-black"
            >
              SIGNUP
            </Typography>
          </Typography> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
