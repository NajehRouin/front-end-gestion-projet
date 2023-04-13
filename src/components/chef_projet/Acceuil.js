import React from 'react'
import Navbar from './navbar/Navbar'
import { useState,useEffect } from 'react'

import { BsXCircleFill ,BsPencilFill,BsPersonPlusFill} from "react-icons/bs";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GrProjects } from "react-icons/gr";
import Loading from '../admin/loading/Loading';
import axios from 'axios';
import './acceuil.css'
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
  titre: '',
  description: '',
  data_debut: '',
  data_fin: '',
  priorite:1,
  etat_tache:'en_attente',
  titre_projet:'',
  _id: ''
}

const initialStateprojet = {
  titre_projet:'',
  tache:[],
  _id: ''
}

function Acceuil() {

  const chef =JSON.parse(localStorage.getItem("chef"))


const [projets,SetProjets]=useState([])
const[equipe,setEquipes]=useState([])
const [id,SetId]=useState()
const [open, setOpen] = useState(false);
const [tacheopen, setTacheOpen] = useState(false);

const [taches,setTache]=useState(initialState)
const [projet, SetProjet] = useState(initialStateprojet)
const[ajouter,setAjouter]=useState(false);
const [getTaches,setGetTaches]=useState([])
const handleOpen = () => {
 
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

const handleOpentache = () => {
 
  setTacheOpen(true);
};
const handleClosetache = () => {
  setTacheOpen(false);
};

  const filterprojet=async()=>{
    console.log("nom",JSON.stringify(chef._id))
    const membre=JSON.stringify(chef._id)
   await fetch('/equipe/find',{membre}).then(res=>res.json()).then(data=>{
      console.log("equipe",data.result)
     // setLoad(true)
     SetId(data.result._id)
    fetch('/projet/projet').then(res=>res.json()).then(result=>{
       
      const projet=result.filter(item => item.equipe._id===data.result._id)
      console.log("projetfetch",projet)
      
      SetProjets(projet)
    
  
    const idtache= projet.map((pro,index)=>(pro.tache))
    for(let j=0;j<idtache.length;j++){
      console.log("idtache",idtache[j])
    }
      
    })
      setTimeout(() => {
        // console.log("msg",employe)
        setEquipes(data.result)
 
    
       }, 1000);
  
      
    })


  }

 


  useEffect(()=>{
    filterprojet()
   //myProject()
   },[])


   const handleChangeInput = e =>{
  

    const {name, value} = e.target
    setTache({...taches, [name]:value})
    console.log("projet select",{taches})
  
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    console.log("taches",{...taches})
  }

  const getprojet=async(id)=>{
    try {
      await fetch('/projet/projet/'+id,{
        method:'get',
    
      }).then(res=>res.json()).then(data=>{
        console.log("getprojet",data)
        SetProjet(data)
    
    
      })
    } catch (error) {
      console.log(error)
    }
  
  }

  const get_Taches=async(id)=>{
    try {
      await fetch('/tache/tache/'+id,{
        method:'get',
    
      }).then(res=>res.json()).then(data=>{
        console.log("getTache",data)
        setTache(data)
    
    
      })
    } catch (error) {
      console.log(error)
    }
  
  }
  const updateProjet=async(id)=>{
const {tache}=projet

taches.titre_projet=projet.titre_projet
const newTache=await fetch('/tache/tache', {
  method: 'POST',
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({...taches})
  
})
    
const result = await newTache.json();
 console.log("result",result)
tache.push(result.result._id)
console.log("projet",{...projet})
await fetch('/projet/projet/'+id,{
  method:'put',
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({...projet}),
}).then(res=>res.json()).then(async data=>{
  console.log(data)
})


  }
  return (
<>
    <Navbar/>
       <div className="container_acceuil" >
     <h2>Listes Des Projets <small>{projets.length} projets</small></h2>



{
  
  //affeche detaill tache 
  
}



<div>
      
      <Modal
        open={tacheopen}
        onClose={handleClosetache}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
        <div className='form_tache'>
      
        { !ajouter && (<h3>Detaill Tache {taches.titre}</h3>)} 
        <table className='table'>
  <tr>
    <th>tache</th>
    <th>descriptioni</th> 
    <th>data_debut</th>
    <th>data_fin</th>
    <th>priorite</th>
    <th>etat_tache</th>
  </tr>
  <tr>
    <td>{taches.titre}</td>
    <td>{taches.description}</td>
    <td>{taches.data_debut}</td>
    <td>{taches.data_fin}</td>
    <td>{taches.priorite}</td>
    <td>{taches.etat_tache}</td>
  </tr>
 

</table>

   
    

    </div>
   
        </Box>
      </Modal>
    </div>




     <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='Ajouter-form'>
        <form >
     { ajouter ? (<h3>créer Taches</h3>):(<h3>Modifier tache </h3>)} 
        <input type='text' name="titre"required placeholder='titre' 
                 onChange={handleChangeInput}   value={taches.titre} />
           <input type='text' name="description"required placeholder='description' 
            onChange={handleChangeInput} value={taches.description}  />
          <input type='date' name="data_debut"required placeholder='data_debut' 
               onChange={handleChangeInput}  value={taches.data_debut} />
          <input type='date' name="data_fin"required placeholder='data_fin' 
             onChange={handleChangeInput} value={taches.data_fin}/>
          <input type='number' name="priorite"required placeholder='priorite' 
           onChange={handleChangeInput}  value={taches.priorite} />
               {!ajouter && <input type='text' name="etat_tache"required placeholder='etat_tache' 
            onChange={handleChangeInput} value={taches.etat_tache}  />
  }
          <div className='row'>
          {ajouter ?  ( <button type='button' onClick={()=>{
                 updateProjet(projet._id)}}>créer</button>):(<button type='button' onClick={()=>{
                 
                  }}>Modifier tache</button>)}
                
                
            
         
          </div>
   
        </form>

    </div>
   
        </Box>
      </Modal>
    </div>

   
     <ul className="responsive-table-projet">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">titre</div>
      <div className="col col-3">description</div>
      <div className="col col-4">data_debut</div>
      <div className="col col-5">data_fin</div>
      <div className="col col-6">etat</div>
      <div className="col col-7">equipe</div>
      <div className="col col-8">tache</div>
    
      <div className="col col-9">Actions</div>
    </li>
    {  
   

      projets.map((pro,index)=>(
     
        <li className="table-row"key={pro._id}>
        <div className="col col-1" data-label="Id">{index}</div>
        <div className="col col-2" data-label="titre_projet">{pro.titre_projet}</div>
        <div className="col col-3" data-label="description_projet">{pro.description_projet}</div>
        <div className="col col-4" data-label="data_debut_projet">{pro.data_debut_projet}</div>
        <div className="col col-5" data-label="data_fin_projet">{pro.data_fin_projet}</div>
        <div className="col col-6" data-label="etat_projet">{pro.etat_projet}</div>
        <div className="col col-7" data-label="equipe">{pro.equipe.nom_equipe}</div>
        <div className="col col-8" data-label="tache">{pro.tache.map((t,i)=>(
   t.etat_tache==="terminer" ? (<div key={i}>
        
   <p onClick={()=>{setAjouter(false)
        handleOpentache()
   get_Taches(t._id)}}style={{color:'#0EDC86'}} >{t.titre}</p>

 
</div>):(<div key={i}>
        
        <p onClick={()=>{setAjouter(false)
             handleOpentache()
        get_Taches(t._id)}} style={{color:'#FF6E61'}} >{t.titre}</p>
     
      
     </div>)

   
     
     ))  }</div>
        <div className="col col-9" data-label="Actions">
        <div className='row'>
        <BsPencilFill onClick={()=>{
          setAjouter(true)
          setTache(initialState)
          
          console.log("objet ",pro._id)
          getprojet(pro._id)
          handleOpen()
        }}style={{color:'blue'}} />
        
    
      </div>

        </div>
      </li>
      ))
    }


  </ul>
 </div>
 {projets.length === 0 && <Loading/>}
    </>
  )
}

export default Acceuil