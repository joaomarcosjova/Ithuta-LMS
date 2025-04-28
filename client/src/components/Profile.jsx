import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const Profile = () => {
  const { user } = useUser();
  const { navigate, isEducator, setIsEducator } = React.useContext(AppContext); // <-- Fix: Access isEducator from context
  const [loading, setLoading] = useState(false);

  const handleBecomeEducator = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/educator/register", {
        userId: user.id,
      });
      if (response.data.success) {
        setIsEducator(true); // Update the context with the new educator status
        toast.success("Now you're an educator!");
        navigate("/educator/dashboard");
      }
    } catch (error) {
      toast.error("Error becoming educator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold">Welcome, {user.firstName}</h1>
      <div className="mt-4">
        <button className="text-blue-600" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
        <button
          className="text-red-600 mt-2"
          onClick={() => user.delete()}
        >
          Delete Account
        </button>

        {/* Become Educator / Educator Dashboard */}
        {!isEducator && (
          <button
            className="text-green-600 mt-4"
            onClick={handleBecomeEducator}
            disabled={loading}
          >
            {loading ? "Loading..." : "Become an Educator"}
          </button>
        )}
        {isEducator && (
          <button
            className="text-blue-600 mt-4"
            onClick={() => navigate("/educator/dashboard")}
          >
            Go to Educator Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
