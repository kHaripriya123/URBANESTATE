import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../utils/propertySlice";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const allowedFields = ["title", "builtupArea", "price", "ageOfProperty", "bedrooms", "bathrooms", "amenities", "contactNumber"];

const MyProperties = () => {
  const dispatch = useDispatch();
  const propertiesList = useSelector((state) => state.property.properties) || [];
  
  const [editId, setEditId] = useState(null);
  const [formInfo, setFormInfo] = useState({});
  const [loading, setLoading] = useState(true); // Add this line


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axiosInstance.get("/myProperties");
        console.log("✅ API Response:", response.data);

        if (Array.isArray(response.data)) {
          dispatch(setProperties(response.data)); 
          console.log("🔹 Properties Updated in Redux:", response.data);
        } else {
          dispatch(setProperties([])); 
          console.warn(" Unexpected response format: Not an array.");
        }
      } catch (error) {
        console.error(" API Fetch Error:", error);
        dispatch(setProperties([])); // Prevents app crash
      }finally {
        setLoading(false); // Stop loading (success or error)
    }
  }

    fetchProperties();
  }, [dispatch]);

  const handleEdit = (property) => {
    setEditId(property._id);
    setFormInfo(property);
  };

  const handleInputChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, propertyId) => {
    e.preventDefault();

    // ✅ Filter only allowed fields before sending request
    const filteredData = Object.fromEntries(
      Object.entries(formInfo).filter(([key]) => allowedFields.includes(key))
    );

    console.log("📤 Sending update data:", filteredData); // Debugging

    try {
      const response = await axiosInstance.patch(`/editProperty/${propertyId}`, filteredData, { withCredentials: true });
      console.log("✅ Property Updated:", response.data);

      // ✅ Update Redux store properly (replace only the edited property)
      dispatch(setProperties(propertiesList.map(prop => prop._id === propertyId ? response.data : prop)));

      alert("Property Updated Successfully!");
      setEditId(null);
    } catch (error) {
      console.error("❌ Error updating property:", error.response?.data || error.message);
      alert("Failed to update property.");
    }
  };

  console.log("🔹 Redux State Properties:", propertiesList); // ✅ Debug Redux State
  if (loading) {
    return <Typography variant="h5" className="text-center mt-10">Loading properties...</Typography>;
  }
  

  return (
    <div className="flex flex-wrap">
      {propertiesList.length === 0 ? (
        <Typography variant="h5" className="text-center mt-10">
          No properties found.
        </Typography>
      ) : (
        propertiesList.map((property) => (
          <Card key={property._id} shadow={false} className="  border border-black my-5 w-96 h-80 items-center mx-auto bg-black text-white">
            <CardBody className=" flex flex-col items-center">
              {editId === property._id ? (
                <form onSubmit={(e) => handleSubmit(e, property._id)} className="w-full flex flex-col items-center text-logoColor">
                  <div className="w-3/4">
                    <label className="block my-1  text-white">TITLE</label>
                    <input type="text" name="title" value={formInfo.title || ""} onChange={handleInputChange} className="w-full  rounded px-2 py-1  border border-logoColor" />
                    
                    <label className="block my-1 text-white">PRICE</label>
                    <input type="number" name="price" value={formInfo.price || ""} onChange={handleInputChange} className="w-full border border-logoColor rounded px-2 py-1" />
                    
                    <label className="block my-1 text-white">AGE OF PROPERTY</label>
                    <input type="number" name="ageOfProperty" value={formInfo.ageOfProperty || ""} onChange={handleInputChange} className="w-full border border-logoColor rounded px-2 py-1" />
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="outlined" type="submit" className="border border-white bg-logoColor text-white">Save</Button>
                    <Button variant="outlined" onClick={() => setEditId(null)} className="border border-white bg-logoColor text-white">Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="w-3/4 text-center mt-8">
                   <Typography variant="subtitle1" className="my-1">{property.address}</Typography>
                  <Typography variant="subtitle1" className="my-1">{property.title}</Typography>
                  <Typography variant="subtitle1" className="my-1">{property.price}</Typography>
                  <Typography variant="subtitle1" className="my-1">{property.ageOfProperty}</Typography>
                  <Button variant="outlined" onClick={() => handleEdit(property)} className="mt-4 border border-white bg-logoColor text-white">Edit</Button>
                </div>
              )}
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyProperties;
