import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { BellIcon, UserCircleIcon } from '@heroicons/react/outline';

export default function AppLayout() {
  const navigate = useNavigate();
  const { isLoading, logout } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const goToFavourites = () => {
    navigate("/app/favourites");
  };

  const goToProfile = () => {
    navigate("/app/profile");
    handleProfileClick();
  };

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col relative">
      {/* Navigation bar */}
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* Title */}
          <Link to="/app" className="text-3xl font-bold">
            LiveScore
          </Link>

          {/* Buttons: Favorites, Profile, Logout */}
          <div className="space-x-4 flex items-center">
            <button className="hover:bg-gray-800 px-4 py-2 rounded-md focus:outline-none text-lg" onClick={goToFavourites}>
              <BellIcon className="w-6 h-6 inline mr-1" /> Favourites
            </button>
            <button className="hover:bg-gray-800 px-4 py-2 rounded-md focus:outline-none text-lg" onClick={handleProfileClick}>
              <UserCircleIcon className="w-6 h-6 inline mr-1" /> Profile
            </button>
          </div>
        </div>
      </div>

      {/* Grey background for the remaining area */}
      <div className="bg-gray-200 flex-1">
        {/* Component Container */}
        <div className="container mx-auto py-4 flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-center">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Profile menu */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-gray-100 border border-gray-300 rounded-md shadow-lg">
          <button className="block w-full py-2 px-4 text-left text-black hover:bg-gray-200" onClick={goToProfile}>
            View Profile
          </button>
          <button className="block w-full py-2 px-4 text-left text-black hover:bg-gray-200" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
