import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setProperties } from "../utils/propertySlice";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
// import EditProperty from "./EditProperty";
// import { useSelector } from "react-redux";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    builtupArea: "",
    price: "",
    ageOfProperty: "",
    // images: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    contactNumber: "",
    role: ""
  });


  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyInfo = await axiosInstance.post("/addProperty", formData, { withCredentials: true });
      dispatch(setProperties(propertyInfo.data));
      console.log(propertyInfo);
      alert("Property Posted Successfully!");

      // // Reset form after submission
      // setFormData({
      //   title: "",
      //   address: "",
      //   builtupArea: "",
      //   price: "",
      //   ageOfProperty: "",
      //   bedrooms: "",
      //   bathrooms: "",
      //   amenities: "",
      //   contactNumber: "",
      //   role: ""
      // });
    } catch (error) {
      console.error("Error posting property:", error);
      alert("Failed to post property. Please try again.");
    }
  };
  


  const fields = [

    { name: "title", type: "text", placeholder: "Title" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "builtupArea", type: "number", placeholder: "Built-up Area" },
    { name: "price", type: "number", placeholder: "Price" },
    { name: "ageOfProperty", type: "number", placeholder: "Age of Property" },
    // { name: "images", type: "text", placeholder: "Image URLs (comma-separated)" },
    { name: "bedrooms", type: "number", placeholder: "Bedrooms" },
    { name: "bathrooms", type: "number", placeholder: "Bathrooms" },
    { name: "amenities", type: "text", placeholder: "Amenities (comma-separated)" },
    { name: "contactNumber", type: "text", placeholder: "Contact Number" },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="flex mt-10 w-80 ml-20 justify-center  items-center">
      <Card className=" border border-black bg-black justify-center  items-center ">
      
        
      <form onSubmit={handleSubmit} className="my-16 ml-5 justify-center  items-center" >
        {/* <Typography className=""> */}
        {fields.map((field) => <input className=" bg-black border border-white px-2 py-2 text-white my-2 rounded-md"
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
        />)}
       {/* </Typography> */}
         
       
        <select className="mx-10 mr-20 my-10 rounded-md bg-white  text-logoColor px-2 py-2 "  name="role" value={formData.role} onChange={handleChange} required>
          <option className="text-white" value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="agent">Agent</option>

        </select>
       
       
        <button className="font-bold text-logoColor bg-white px-2 py-1 rounded-lg" type="submit">SAVE</button>
       
      </form>
      
     
     
      
      </Card>
     </div>

  )
}

export default PropertyForm;