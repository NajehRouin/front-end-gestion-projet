import React, { useEffect, useState } from 'react'
import DashboardAdmin from '../DashboardAdmin'
import { BsXCircleFill ,BsPencilFill,BsPersonPlusFill} from "react-icons/bs";
import './style.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



const initialState = {
  nom: '',
  prenom: '',
  email: 0,
  role: '',
  adress: '',
  _id: ''
}

function Employe() {

  const token=localStorage.getItem('token')
 

  const [Role,setRole]=useState('')
  const [emp, setEmp] = useState(initialState)
  const [roles,setRoles]=useState([])
const [employe,setEmploye]=useState([])
const [open, setOpen] = useState(false);

const handleChangeSelect = e =>{
  const {name, value} = e.target
  console.log({[name]:value})
  setRole(value)
  console.log("domaine", Role)

}
const handleChangeInput = e =>{
  

  const {name, value} = e.target
  setEmp({...emp, [name]:value})
}

const handleSubmit = async e =>{
  e.preventDefault()
  console.log("empajouter",{...emp})
  console.log("token",token.accessToken)
  try {
    await axios.post('/user/Ajouter', {...emp}, {
      headers: {Authorization: token}
  })
  window.location.reload()
  } catch (error) {
    alert(error.response.data.msg)
  }


}
const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
useEffect(()=>{
  fetch('/user/getusers').then(res=>res.json()).then(data=>{
    console.log("employe",data)
    setEmploye(data)
  })
},[])

useEffect(()=>{
  fetch('/role/roles').then(res=>res.json()).then(data=>{
    console.log("roles",data)
  setRoles(data)
  })
},[])

const deletUser=(id)=>{
  fetch('/user/deletUser/'+id,{
    method:'delete',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}).then(res=>res.json()).then(data=>{
    console.log('supprimer',data)
    window.location.reload()
  })
   
  

}
  return (
    <>
<DashboardAdmin />
<div className="container">
  <h2>Listes Des Employes <small>{employe.length}</small></h2>
  <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='Ajouter-form'>
        <form onSubmit={handleSubmit} >
        <h3>Ajouter Employe </h3>
        <input type='text' name="nom"required placeholder='Nom' 
                   onChange={handleChangeInput}    />
           <input type='text' name="prenom"required placeholder='Prenom' 
                onChange={handleChangeInput}       />
          <input type='email' name="email"required placeholder='Email' 
                   onChange={handleChangeInput}  />
          <input type='password' name="password"required placeholder='Password' autoComplete='on'
                 onChange={handleChangeInput}     />
            <input type='text' name="adress"required placeholder='adress' 
                    onChange={handleChangeInput}   /> 
              <div className="row">
                    <label htmlFor="role">Roles: </label>
                    <select name="role" value={emp.role}  onChange={handleChangeInput}
                   
                    >
                        <option value="" >Please select a role</option>
                        {
                            roles.map(role => (
                              <option value={role._id} key={role._id} >
                                  {role.libelle}
                                 
                              </option>
                       
                          ))
                        }
                    </select>
                </div>

          <div className='row'>
            <button type='submit'>Ajouter</button>
         
          </div>
   
        </form>

    </div>
   
        </Box>
      </Modal>
    </div>
  <BsPersonPlusFill className='add'  onClick={()=>{
handleOpen()
  }}/>
  <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">Nom</div>
      <div className="col col-3">Prenom</div>
      <div className="col col-4">Email</div>
      <div className="col col-5">Role</div>
      <div className="col col-6">Adresse</div>
      <div className="col col-7">Actions</div>
    </li>
    {
      employe.map((em,index)=>(
     
        <li className="table-row"key={em._id}>
        <div className="col col-1" data-label="Id">{index}</div>
        <div className="col col-2" data-label="Nom">{em.nom}</div>
        <div className="col col-3" data-label="Prenom">{em.prenom}</div>
        <div className="col col-4" data-label="Email">{em.email}</div>
        <div className="col col-5" data-label="Role">{em.role.libelle}</div>
        <div className="col col-6" data-label="Adress">{em.adress}</div>
        <div className="col col-7" data-label="Adress">
        <div className='row'>
        <BsPencilFill onClick={()=>{
          console.log("objet ",em._id)
        }}style={{color:'blue'}} />
          <BsXCircleFill onClick={()=>{
            deletUser(em._id)
          }} style={{color:'red'}}/>
    
      </div>

        </div>
      </li>
      ))
    }


  </ul>
</div>
        </>
  )
}

export default Employe