//------------------ Navbar.css -------------------//
.active{
    padding-bottom: 2px;
    border-bottom: 2px solid #49557e;
}

//------------------ Navbar.jsx -------------------//
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
    const [menu, setMenu] = useState("home")

  return (
    <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu == "home" ? "active" : ""}>Home</li>
        <li onClick={()=>setMenu("menu")} className={menu == "menu" ? "active" : ""}>Menu</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu == "mobile-app" ? "active" : ""}>Mobile-App</li>
        <li onClick={()=>setMenu("contact-us")} className={menu == "contact-us" ? "active" : ""}>Contact Us</li>
    </ul>
  );
};
export default Navbar;
