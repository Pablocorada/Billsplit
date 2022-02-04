import React, { useContext, useEffect } from 'react';
import { AccountContext } from './AccountContext';
import { Balance } from './Balance';
import { Gastos } from './Gastos';
import { NewGasto } from './NewGasto';
import { NewMemberCuenta } from './NewMemberCuenta';
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
    <div id='cuentaBox' className='box w-75 pt-3'>
        <div className='row justify-content-center'>
            <h1 className='mt-3 mb-0 fs-1'>{currentCuenta.title}</h1>
            <hr className='accountSepTitle'/>
        </div>
        <div className='row justify-content-around'>
            <NewMemberCuenta cuenta={currentCuenta} />
            <NewGasto cuenta={currentCuenta} />
            <Gastos />
            <hr className='accountSep'/>
            <Balance />
            <hr className='accountSep'/>
        </div>
        <div className='row px-3'>
            <QuienDebe />
        </div>
    </div>
    );
};
