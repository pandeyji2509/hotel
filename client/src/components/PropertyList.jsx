import { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackInteraction = async (property) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/recommendations/track`,
        {
          propertyId: property.FIELD1,
          hotelName: property.Hotel_Name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Interaction tracked:", property.Hotel_Name);
    } catch (err) {
      console.error("Failed to track interaction", err);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading properties...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image source
              alt={property.Hotel_Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{property.Hotel_Name}</h3>
              <p className="text-gray-600 text-sm">{property.Location}</p>
              <p className="mt-2 text-gray-800">Category: {property.Review}</p>
              <p className="mt-1 text-gray-600 text-sm">
                Total Reviews: <span className="font-medium">{property.Total_Review}</span>
              </p>
              <p className="mt-1 text-gray-600 text-sm">
                Rating: <span className="font-bold">{property.Rating}</span> / 10
              </p>
              <div className="mt-4">
                <button
                  onClick={() => trackInteraction(property)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Track Interaction
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
