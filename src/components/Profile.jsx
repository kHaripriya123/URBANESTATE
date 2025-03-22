import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setProfile } from "../utils/profileSlice";
import { useState, useEffect } from "react";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get("/getProfile").then((response) => {
      dispatch(setProfile(response.data));
      setFormData(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🟢 Sending Data:", formData);

    const { firstName, lastName, emailId, contact } = formData;
    const updateData = { firstName, lastName, emailId, contact };

    axiosInstance.patch("/editProfile", updateData, { withCredentials: true }).then((response) => {
      dispatch(setProfile(response.data));
      alert("Profile Updated!");
      setIsEditing(false);
    });
  };

  return (
    <div>
      <Card shadow={false} className="border border-black my-10 bg-black py-3  text-white w-96 items-center mx-auto">
        <CardBody className=" text-white flex flex-col items-center py-3">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-logoColor py-3">
              <div className="w-3/4">
                <label className="block my-2 text-white">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border rounded px-2 py-2" />
                
                <label className="block my-2 text-white">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border rounded px-2 py-2" />
                
                <label className="block my-2 text-white">Email ID</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} className="w-full border rounded px-2 py-2" />
                
                <label className="block my-2 text-white">Contact</label>
                <input type="number" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full border rounded px-2 py-2" />
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outlined" type="submit" className="bg-white text-logoColor">Save</Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)} className="bg-white text-logoColor">Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="w-3/4 text-center">
              <Typography variant="h6" className="my-2">{formData.firstName} {formData.lastName}</Typography>
              <Typography variant="subtitle1" className="my-1">{formData.emailId}</Typography>
              <Typography variant="subtitle1" className="my-1">{formData.contact}</Typography>
              <Button variant="outlined" onClick={() => setIsEditing(true)} className="mt-4 bg-white text-logoColor">Edit</Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
