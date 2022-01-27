import React, { useContext, useEffect } from 'react';
import { AccountContext } from './AccountContext';
import { Balance } from './Balance';
import { Gastos } from './Gastos';
import { QuienDebe } from './QuienDebe';

export const Cuenta = ({id}) => {

    const {cuenta} = useContext(AccountContext);
    const {setAddCuenta} = useContext(AccountContext);
    const {setCancel} = useContext(AccountContext);

    useEffect(() => {
      
        const cuentaBox = document.querySelector('#cuentaBox');
        const addCuentaBox = document.querySelector('#addCuentaBox');
        const historialBox = document.querySelector('#historialBox');
        if (cuenta){
            cuentaBox.classList = 'box w-75'
            addCuentaBox.classList = 'd-none'
            historialBox.classList = 'd-none'
            setAddCuenta(false)
            setCancel(false)
        }else{
            cuentaBox.classList = 'd-none'
            };
    }, [cuenta,setAddCuenta,setCancel]);


  return (
    <div id='cuentaBox' className='box w-75'>
        <div className='row justify-content-around'>
            <Gastos id={id} />
            <Balance id={id} />
        </div>
        <div className='row px-5'>
            <QuienDebe id={id} />
        </div>
    </div>
    );
};
