import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [

  {
    title: "Home",
    path: "/acceuil",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Taches",
    path: "/taches",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "reserver materiel",
    path: "/reservation",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  },
  {
    title: "mon equipe",
    path: "/acceuil",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text"
  },

];
