import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import Fixture from './Fixture';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* Title */}
          <Link to="/" className="text-3xl font-bold">
            LiveScore
          </Link>

          {/* Login and Sign Up buttons */}
          {!isAuthenticated ? (
            <div className="space-x-4">
              <button className="hover:bg-gray-800 border border-gray-500 px-4 py-2 rounded-md" onClick={loginWithRedirect}>
                Login
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={signUp}>
                Sign Up
              </button>
            </div>
          ) : (
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => navigate("/app")}>
              Go to App
            </button>
          )}
        </div>
      </div>

      {/* Grey background for the remaining area */}
      <div className="bg-gray-200 flex-1">
        {/* Match component rendering football matches */}
        <div className="container mx-auto py-4 flex justify-center">
          {/* Match component */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-center">
              <Fixture />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
