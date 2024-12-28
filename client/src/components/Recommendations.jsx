import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recommendations/suggestions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecommendations(response.data);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Recommended Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src="/hotel-placeholder.jpg"
              alt={property.hotelName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.hotelName}</h3>
              <p className="text-gray-600 text-sm">Interactions: {property.interactionCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
