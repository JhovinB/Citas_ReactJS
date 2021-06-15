import React ,{Fragment,useState,useEffect}from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //LocalStorage
  let citasIniciales=JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales=[];
  }
  //Listado de Citas
  const [citas, guardarCitas] = useState(citasIniciales);
  /* UseEffect->Para realizar cierta operacion cuando
 el State cambia */
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas,citasIniciales]);
  //Funcion q tome las citas actuales y agregue la nueva
  const crearCita =cita=>{
  guardarCitas([...citas,cita]);
  }
  //Funcion elimina cita
  const eliminarCita =id=>{
    const deleteCitas = citas.filter(cita=>cita.id!==id);
    guardarCitas(deleteCitas);
  }
  //Mensaje condicional
  const titulo = citas.length===0?'No hay citas':'Administra tus citas';
 return(
 <Fragment>
   <h1>Administrador de Pacientes</h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
          crearCita={crearCita}/>
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita=>(
            <Cita 
            key={cita.id}
            cita={cita}
            eliminarCita={eliminarCita}
            />
            ))}
        </div>
      </div>
    </div>
 </Fragment>
 );
}

export default App;
