import React , { useState,useEffect }  from 'react'
import Navbar from '../navbar/Navbar'
import { BsXCircleFill ,BsPencilFill,BsFillPlusCircleFill} from "react-icons/bs";
import Loading from '../../admin/loading/Loading';
import LoadingImg from '../../admin/loading/LoadingImg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import toast, { Toaster } from 'react-hot-toast';
import './mes_reservation.css'
import { AiOutlineClear ,AiFillCloseCircle} from "react-icons/ai";
const initialState = {
  code_materiel: '',
  libelle: '',
  categorie: '',

   _id: ''
}

const initialReserve = {
  chef: '',
  projet: '',
  materiel: '',
  description:'',
  date_reservation:'',
   _id: ''
}
const Uls=[
  {id:"1",uls:"tunis"},
  {id:"2",uls:"manouba"},
  {id:"3",uls:"ben arous"},
  {id:"4",uls:"ariana"},
]

const Types=[
  {id:"1",type:"capex"},
  {id:"2",type:"opex"},

]
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
function Reservation() {
  const chef =JSON.parse(localStorage.getItem("chef"))
  const [materiles,SetMateriles]=useState([])


const [materiel,setMateriel]=useState(initialState)
const [reserve,setreserve]=useState(initialReserve)

    const [open, setOpen] = useState(false);
    const[ajouter,setAjouter]=useState(false);
    const [categories,Setcategories]=useState([])
    const [category, setCategory]=useState([])
    const [projets,SetProjets]=useState([])
    const [view,setView]=useState(false)

    const [ULS,setULs]=useState()
    const [TYPES,SetTypes]=useState()

    const handleOpen = () => {
 
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  const getAllMateiel =async()=>{

    fetch('/materiel/materiel').then(res=>res.json()).then(data=>{
     
      //setLoad(true)
      //console.log("msg",data)
      setTimeout(() => {
       
        SetMateriles(data.result)
       }, 1000);
    
      
    })
  }
  useEffect(()=>{
    fetch('/categorie/categorie').then(res=>res.json()).then(data=>{
  
    Setcategories(data)
  
    })
  },[])

  const Mesprojet=async()=>{

   


    const membre=chef._id
 
  
    

    await fetch('/equipe/findeq', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({membre})
      
    }).then(res=>res.json()).then(data=>{

      fetch('/projet/projet').then(res=>res.json()).then(result=>{
       
        const projet=result.filter(item => item.equipe._id===data.result._id)
      
        
        SetProjets(projet)
      

        
      })
     

    })

  


  }



  useEffect(()=>{

    getAllMateiel()
    Mesprojet()
    
  },[])





  const getmatById=async(id)=>{
    try {
      await fetch('/materiel/materiel/'+id,{
        method:'get',
    
      }).then(res=>res.json()).then(data=>{
      
  
       setMateriel(data.result)
  
    
      })
    } catch (error) {
      console.log(error)
    }
  
  }




const handleChangeInput = e =>{
  const {name, value} = e.target
  setreserve({...reserve, [name]:value})

}






const handleSubmit = async e =>{
  e.preventDefault()

reserve.materiel=materiel._id
reserve.chef=chef._id
 console.log("mate",{...reserve})
 try {
    await axios.post('/reservation/reservation', {...reserve})
  handleClose()
  setTimeout(() => {
    // console.log("msg",employe)
     getAllMateiel()
   }, 100);
  } catch (error) {
    alert(error.response.data.msg)
  }

}


const handleULStchange=e=>{
  const {name, value} = e.target
 
    console.log('ULS',value)
    setULs(value)

  
}

const handleTypetchange=e=>{
  const {name, value} = e.target
 

SetTypes(value)  
}


const handleCategory = e => {
  const {name, value} = e.target
  console.log('categorie',value)
  setCategory(e.target.value)


  if(!TYPES){
    alert("choisissez un type ")

    return false
  }
  if((!ULS)){
    alert("choisissez une ULS ")
    return false
  }
  const filter=materiles.filter(item=>   item.uls===ULS&&  item.type===TYPES &&   item.categorie.type_cat===value  )
  console.log("filter",filter)
  if(filter.length ===0){
    alert(" filtre non valide ")
    window.location.href="/reservation"
    return false;
  }else{
   
    SetMateriles(filter)
  }

  //setSearch('')
}


const filterMateriel=async()=>{
  const filter=materiles.filter(item=>item.categorie.type_cat===category&& item.uls===ULS&&  item.type===TYPES  )
  console.log("fiter",filter)
  SetMateriles(filter)

}

const clearfilter =async()=>{
  setCategory("categories")
  SetTypes("Type")
  setULs("ULS")
  console.log("hi")
  //getAllMateiel()
  window.location.href="/reservation"
}
  return (
    <>
    <Navbar />
        <div className="container_materiel" >
        <h2>Demande de reservation <small></small></h2>

        <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='Ajouter-form'>
        <form onSubmit={handleSubmit}>
     <h3> reserveé matereil  </h3>
        <input type='text' name="description"required placeholder='description' 
              onChange={handleChangeInput}   />
           <input type='date' name="date_reservation"required placeholder='date reservation' 
           onChange={handleChangeInput}     />
                  
                 
        


          

           
              <div className="row">
                    <label htmlFor="projet">Mes Projets: </label>
                    <select name="projet" 
                  onChange={handleChangeInput} 
                 value={reserve.projet}  >
                        <option value="" >Mes Projets </option>
                        {
                            projets.map(proj => (
                              <option value={proj._id} key={proj._id} >
                                  {proj.titre_projet}
                                 
                              </option>
                       
                          ))
                         
                        }
                        
                    </select>
                </div>

              
            
 
          <div className='row'>
          <button type='submit'>Reserver</button>
                
                
            
         
          </div>
   
        </form>

    </div>
   
        </Box>
      </Modal>
    </div>


    <Toaster
  position="top-center"
  reverseOrder={true}
/>

<div className="filter_menu">
     
    
            <div className="row sort">
                    <label htmlFor="uls">filters par ULS :</label>
                    <select name="uls"  onChange={handleULStchange}
                 value={materiel.uls} 
                    >
                        <option value="" > ULS</option>
                        {
                       
                       Uls.map(u => (
                             
                              <option value={u.uls} key={u.id}  >
                                  {u.uls}
                                
                              </option>
                  
                          ))
                        }
                    </select>

                </div>
                <div className="row sort">
                    <label htmlFor="type"> filter par Types :</label>
                    <select name="type"  onChange={handleTypetchange} 
                    value={materiel.type} 
                    >
                        <option value="" > Type</option>
                        {
                       
                       Types.map(t => (
                             
                              <option value={t.type} key={t.id}  >
                                  {t.type}
                                
                              </option>
                  
                          ))
                        }
                    </select>

                </div>

                <div className="row">
                <span>Filters par Categories: </span>
                <select name="categorie" value={materiel.categorie.type_cat} onChange={handleCategory} >
                    <option value=''>categories</option>
                    {
                        categories.map(category => (
                            <option value={category.type_cat} key={category._id}>
                                {category.type_cat}
                            </option>
                        ))
                    }
                </select>
            </div>
                <div className="row sort">
                  <AiFillCloseCircle
                    color='gray'
                    enableBackground='gray'
                    size={22}
                    onClick={clearfilter}
                  />
                         
                </div>
        </div>





    <ul className="responsive-table-materiel">
    <li className="table-header">
      <div className="col col-1"> Id</div>
      <div className="col col-2">code_materiel</div>
      <div className="col col-3">designation</div>
      <div className="col col-4">categorie</div>
      <div className="col col-5">uls</div>
      <div className="col col-6">types</div>
     
    
      <div className="col col-9">Actions</div>
    </li>
    {  
   

   materiles.map((mat,index)=>(
  
     <li className="table-row"key={mat._id}>
     <div className="col col-1" data-label="Id">{index}</div>
     <div className="col col-2" data-label="code_materiel">{mat.code_materiel}</div>
     <div className="col col-3" data-label="designation">{mat.designation}</div>
     <div className="col col-4" data-label="categorie">{mat.categorie.type_cat}</div>
     <div className="col col-5" data-label="designation">{mat.uls}</div>
     <div className="col col-6" data-label="designation">{mat.type}</div>
    
     <div className="col col-8" data-label="Actions">
     <div className='row'>
     <button onClick={()=>{
       setAjouter(false)
       handleOpen()
       console.log("objet ",mat._id)
       getmatById(mat._id)
       setView(true)
     }}style={{color:'blue'}} >reserver
      </button>
    
   </div>

     </div>
   </li>
   ))
 }


  </ul>
 </div>
 {materiles.length === 0 && <Loading/>}
    </>

  )
}

export default Reservation