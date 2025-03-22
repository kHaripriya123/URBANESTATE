import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFeed, updateSearchFeed } from "../utils/feedSlice";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";


const Feed = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    //  Get properties from Redux
    const feedData = useSelector((store) => store.feed.feed);
    const searchFeed = useSelector((store) => store.feed.searchFeed);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const response = await axiosInstance.get("/feed", { withCredentials: true });
                if (response.data && response.data.length > 0) {
                    dispatch(addFeed(response.data));
                    dispatch(updateSearchFeed(response.data)); //  Store all properties
                }
            } catch (error) {
                console.error("Error fetching feed data:", error);
            }
        };

       
            fetchFeed();
    
    }, [dispatch]);

    //Handle Search
    const handleSearch = async () => {
        if (!search.trim()) {
            dispatch(updateSearchFeed(feedData)); // Show all properties if search is empty
            return;
        }

        try {
            const response = await axiosInstance.post("/searchProperties", { address: search }, { withCredentials: true });

            if (response.data.length > 0) {
                dispatch(updateSearchFeed(response.data));
            } 
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch(updateSearchFeed([]));
        }
    };

    if (feedData.length === 0) return <div>Loading...</div>;

    //  Show search results if available, otherwise show all properties
    const propertiesToShow = searchFeed.length > 0 || search ? searchFeed : feedData;

    return (
        <div>
            {/* Search Bar */}
            <div className="relative">
                <Carousel className="h-80">
                    <img
                       src="https://s.yimg.com/uu/api/res/1.2/.XlLq9Zgse3WQ_5i3yLBqg--~B/aD0xMTQwO3c9MTg0MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-US/homerun/elle_decor_817/b73eb223fa1c4c18a6a614de7786bed0"                        alt="banner"
                        className="w-screen h-full object-cover"
                    />
                </Carousel>

                <div className="absolute top-20 left-10 transform translate-y-1/2 bg-white p-4 rounded-6xl shadow-md flex  w-96">
                    <input
                        className="flex-1 px-4 py-2 rounded-md   text-logoColor  "
                        placeholder="Search by address..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button className="ml-2 bg-logoColor font-bold text-white"  onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>

            {/* Property Listings */}
            <div className="flex flex-wrap justify-center gap-8 p-6 mt-10 space-y-2 text-base">
                {propertiesToShow.length && (
                    propertiesToShow.map((property) => (
                        <Card key={property._id} className="w-96">
                            <CardHeader color="blue-gray" className="relative h-56">
                                <img
                                    src="https://s.yimg.com/uu/api/res/1.2/.XlLq9Zgse3WQ_5i3yLBqg--~B/aD0xMTQwO3c9MTg0MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-US/homerun/elle_decor_817/b73eb223fa1c4c18a6a614de7786bed0"
                                    alt="property"
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>

                            <CardBody className="space-y-2 text-logoColor">
  <Typography variant="h5" color="blue-gray" className="text-lg font-semibold">
    {property.address}
  </Typography>

  <div className="text-logoColor fond-bold">
    <p>Status: {property.status}</p>
    <p>Price: ₹{property.price}</p>
    <p>Built-up Area: {property.builtupArea} sqft</p>
    <p>{property.bedrooms} BHK | {property.bathrooms} Bathrooms</p>
    <p>Amenities: {property.amenities?.join(", ")}</p>
    <p>Listed by: {property.listedBy}</p>
    <p className="text-logoColor">CONTACT: {property.contactNumber}</p>
  </div>
</CardBody>

                        </Card>
                    ))
              
                )}
            </div>
        </div>
    );
};

export default Feed;
