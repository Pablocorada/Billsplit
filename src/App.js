import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AccountContext } from './components/AccountContext';
import { Home } from './components/home/Home';
import { MisCuentas } from './components/misCuentas/MisCuentas';
import { Cuenta } from "./components/cuenta/Cuenta";
import { Login } from "./components/login/Login";
import { Registro } from "./components/registro/Registro";
import { Perfil } from "./components/perfil/Perfil";
import { Header } from "./components/general/Header";
import { Footer } from "./components/general/Footer";
import { useForm } from './hooks/useForm';

const initUsuario = () => {
  const usuario = JSON.parse(sessionStorage.getItem('usuario')) || {};
  
  return usuario;
}

const initCuentas = () => {
  let histCuentas = [];
  if(JSON.parse(sessionStorage.getItem('usuario'))){
    histCuentas = JSON.parse(sessionStorage.getItem('usuario')).cuentas ? JSON.parse(sessionStorage.getItem('usuario')).cuentas : [];
  }

  return histCuentas;
}

function App() {

  const [cuentas,setCuentas] = useState(initCuentas());  
  const [userData, setUserData] = useState(initUsuario());
  const [logged, setLogged] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [addCuenta, setAddCuenta] = useState(false);
  const [cuenta, setCuenta] = useState(false);
  const [gasto, setGasto] = useState(true);
  const [newMemberCuenta, setNewMemberCuenta] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [newGasto, setNewGasto] = useState(0);
  const [numberOptions, setNumberOptions] = useState([1]);
  const [inputOption, setInputOption] = useState([]);
  const [backToAccounts, setBackToAccounts] = useState(false);
  const [misCuentasLink, setMisCuentasLink] = useState('/');
  const [loginLink, setLoginLink] = useState('/login');
  const [registroLink, setRegistroLink] = useState('/registro');
  const [perfilLink, setPerfilLink] = useState('/');
  const [cuentaLink, setCuentaLink] = useState('/');

  const  [{description}, handleDescInputChange, resetDescription]  = useForm({
    description: '',
  });
  const  [{total}, handleTotalInputChange, resetTotal]  = useForm({
    total: '',
  });
  const  [{name}, handleNameInputChange, resetNameInput]  = useForm({
    name: '',
  });   
  
  if(cuentas.length > 10){
    cuentas.splice(10, cuentas.length-10);
  }

  return (
    <AccountContext.Provider value={{
        initCuentas,
        userData,
        setUserData,
        logged,
        setLogged,
        toastMessage,
        setToastMessage ,
        addCuenta,
        setAddCuenta,
        cuentas,
        setCuentas,
        cuenta,
        setCuenta,
        currentId,
        setCurrentId,
        newGasto,
        setNewGasto,
        numberOptions,
        setNumberOptions,
        description, 
        handleDescInputChange, 
        resetDescription,
        total, 
        handleTotalInputChange, 
        resetTotal,
        name, 
        handleNameInputChange, 
        resetNameInput,
        inputOption, 
        setInputOption,
        gasto, 
        setGasto,
        backToAccounts, 
        setBackToAccounts,
        newMemberCuenta, 
        setNewMemberCuenta,
        misCuentasLink, 
        setMisCuentasLink,
        loginLink,
        setLoginLink,
        registroLink,
        setRegistroLink,
        perfilLink,
        setPerfilLink,
        cuentaLink,
        setCuentaLink
      }}>
        
        <Router>
          <Header />
          <main id='main' className='text-center py-3'>
                <div>
                    <Routes>
                        <Route exact path="/" element={ <Home /> } /> 
                        <Route exact path={loginLink} element={ <Login/> } /> 
                        <Route exact path={registroLink} element={ <Registro/> } /> 
                        <Route exact path={perfilLink} element={ <Perfil/> } />
                        <Route exact path={misCuentasLink} element={ <MisCuentas/> } /> 
                        <Route exact path={cuentaLink} element={ <Cuenta/> } /> 
                        <Route exact path="*" element={<Navigate replace to="/" />} /> 
                    </Routes>
                </div>
          </main>
          <Footer />
        </Router>
    </AccountContext.Provider>
  );
}

export default App;
