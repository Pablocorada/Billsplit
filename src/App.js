import { useReducer, useState } from 'react';
import './App.css';
import { AccountContext } from './components/AccountContext';
import { MisCuentas } from './components/MisCuentas';
import { listReducer } from './helpers/listReducer';
import { useForm } from './hooks/useForm';

const init = () => {
  return JSON.parse(localStorage.getItem('cuentas')) || [];
}

function App() {

  let [cuentas,dispatch] = useReducer(listReducer, [], init);  
  const [addCuenta, setAddCuenta] = useState(false);
  const [cuenta, setCuenta] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const [newGasto, setNewGasto] = useState(0);
  const [numberOptions, setNumberOptions] = useState([1]);
  const [inputOption, setInputOption] = useState([]);
  const  [{description}, handleDescInputChange, resetDescription]  = useForm({
    description: '',
  });
  const  [{total}, handleTotalInputChange, resetTotal]  = useForm({
    total: '',
  });

  return (
    <AccountContext.Provider value={{
        addCuenta,
        setAddCuenta,
        cuentas,
        dispatch,
        cuenta,
        setCuenta,
        cancel,
        setCancel,
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
        inputOption, 
        setInputOption
      }}>
        <header className="d-flex justify-content-center align-content-center">
          <h1 className='w-75 my-2'>BillShare</h1>
        </header>
        <main id='main' className='text-center py-3'>
          
          <MisCuentas />
        </main>
    </AccountContext.Provider>
  );
}

export default App;
