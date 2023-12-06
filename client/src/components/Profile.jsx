import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function Profile() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [accessToken]);
  
  useEffect(() => {
    setFormData({
      name: profileData.name,
      email: profileData.email
    });
  }, [profileData.name, profileData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setEditing(false);
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="text-black">
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="w-64 flex items-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <img src={user.picture} width="70" alt="profile avatar" />
          <p>Name: {profileData.name}</p>
          <p>📧 Email: {profileData.email}</p>
          <p>✅ Email verified: {user.email_verified?.toString()}</p>
          <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}