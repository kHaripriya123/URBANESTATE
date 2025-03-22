import { useState } from "react";
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
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userSignup = async () => {
    try {
       const userData =  await axios.post(BASE_URL + "/signup", formData);
      
      navigate("/login"); // ✅ Redirect to login after signup
    } catch (error) {
      setError(error.response?.data || "Signup failed!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          
          className="mb-4 grid h-28 place-items-center  bg-logoColor"
        >
          <Typography variant="h3" color="white"  className="bg-logoColor">
            SIGN UP
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="First Name"
            size="lg"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            size="lg"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            label="Email"
            size="lg"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Contact"
            size="lg"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          
        </CardBody>
        <CardFooter className="pt-0 ">
          <Button className="bg-logoColor" fullWidth onClick={userSignup}>
            SIGN UP
          </Button>
          <Typography variant="small" className="mt-6 flex  justify-center">
            Already have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              LOGIN
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
