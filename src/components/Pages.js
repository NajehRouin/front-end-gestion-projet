import React ,{useContext}from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login  from './auth/Login'
import DashboardAdmin from './admin/DashboardAdmin';
import Acceuil from './chef_projet/Acceuil';
import Employe from './admin/employe/Employe';
import NotFound from './not_found/NotFound';
import Roles from './admin/roles/Roles';
import Equipe from './admin/equipe/Equipe';
import Projet from './admin/projet/Projet';
import Materiel from './admin/materiel/Materiel';
import Loading from './admin/loading/Loading'

function Pages() {
      const isloginAdmin=localStorage.getItem('LoginAdmin')
      const islogin=localStorage.getItem('Login')
  return (

    <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/acceuil" element={<Acceuil/>} />
          <Route path="/load" element={<Loading />} />
          <Route path="/admin" element={isloginAdmin ?<DashboardAdmin/>:<NotFound />} />
        
          <Route path="/employe" element={isloginAdmin ? <Employe/>:<NotFound /> } />
          <Route path="/equipe" element={isloginAdmin ? <Equipe/>:<NotFound /> } />
          <Route path="/role" element={isloginAdmin ? <Roles/>:<NotFound /> } />
          <Route path="/projet" element={isloginAdmin ? <Projet/>:<NotFound /> } />
          <Route path="/materiel" element={isloginAdmin ? <Materiel/>:<NotFound /> } />
          <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}
export default Pages;