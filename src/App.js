import { useReducer, useState } from 'react';
import './App.css';
import { AccountContext } from './components/AccountContext';
import { MisCuentas } from './components/MisCuentas';
import { listReducer } from './helpers/listReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('cuentas')) || [];
}

function App() {

  let [cuentas,dispatch] = useReducer(listReducer, [], init);
  const [addCuenta, setAddCuenta] = useState(false);
  const [cuenta, setCuenta] = useState(false);
  const [cancel, setCancel] = useState(true);

  return (
    <AccountContext.Provider value={{
        addCuenta,
        setAddCuenta,
        cuentas,
        dispatch,
        cuenta,
        setCuenta,
        cancel,
        setCancel
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
