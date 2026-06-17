import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserData } from "./features/user/userFeatures";
import { startUser } from "./Services/login";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.editUser.userData);

  // AUTH CHECK
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await startUser();

        if (response?.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(null));
        }
      } catch (error) {
        dispatch(addUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  // SAFE REDIRECT (FIX)
  useEffect(() => {
    if (user === null) {
      if (
        location.pathname.startsWith("/dashboard") ||
        location.pathname.startsWith("/resume")
      ) {
        navigate("/auth/sign-in");
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#020617] text-white">

      <Header user={user} />

      <main className="px-4 md:px-10 lg:px-16 py-6">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}

export default App;