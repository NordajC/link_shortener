import { useNavigate } from "react-router-dom";
import { Navbar01 } from "./shadcn-io/navbar-01";
import { useAuth } from "../../context/authContext/authContext";
import { toast } from "sonner";

function NavbarWrapper() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 👇 Add this debugging line
  console.log("NavbarWrapper rendered. User is:", user);

  const handleSignInClick = () => {
    navigate("/auth");
  };

  const handleLogoutClick = async () => {
    await logout();
    toast.success("You have been logged out.");
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <Navbar01
      user={user}
      onSignInClick={handleSignInClick}
      onLogoutClick={handleLogoutClick}
      onDashboardClick={handleDashboardClick}
    />
  );
}

export default NavbarWrapper;