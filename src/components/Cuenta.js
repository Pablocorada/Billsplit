import React, { useContext, useEffect } from 'react';
import { AccountContext } from './AccountContext';
import { Balance } from './Balance';
import { Gastos } from './Gastos';
import { NewGasto } from './NewGasto';
import { QuienDebe } from './QuienDebe';

export const Cuenta = () => {

    let {cuentas} = useContext(AccountContext);
    let {currentId} = useContext(AccountContext);
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

    let currentCuenta = {};

    cuentas.forEach(element => {
        if(element.id===currentId){
            currentCuenta = element;
        }
    });

  return (
    <div id='cuentaBox' className='box w-75'>
        <div className='row justify-content-around'>
            <NewGasto cuenta={currentCuenta} />
            <Gastos />
            <Balance />
        </div>
        <div className='row px-5'>
            <QuienDebe />
        </div>
    </div>
    );
};
