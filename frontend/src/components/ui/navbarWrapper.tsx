import { useNavigate } from "react-router-dom";
import { Navbar01 } from "./shadcn-io/navbar-01";


function NavbarWrapper() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Navigate to the Auth page on Sign In click
    navigate("/auth");
  };

  return (
    <Navbar01 onSignInClick={handleSignInClick} /> //add onCtaClick={function} later on
  );
}

export default NavbarWrapper;
