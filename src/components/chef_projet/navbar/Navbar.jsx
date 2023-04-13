import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";

// STYLES
import "./Navbar.css";

export default function Navbar() {
  const LogOut=()=>{
    localStorage.removeItem("Login");
  localStorage.removeItem("chef");
  window.location.href = "/";
  
  }
  const chef =JSON.parse(localStorage.getItem("chef"))

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
           
            <li className="nav-text" >

                <Link to="/profil">
                <FaIcons.FaUserCircle />
                        <span>{chef.nom}</span>
                      </Link>

                </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text" onClick={()=>LogOut()}>

            <Link to="/">
            <BiIcons.BiLogOutCircle />
                    <span>Déconnexion</span>
                  </Link>
        
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
