import React, { useContext, useEffect } from 'react';
import { AccountContext } from '../AccountContext';
import { GastosItem } from './GastosItem';

export const Gastos = () => {

    let {setNewGasto} = useContext(AccountContext);
    let {gasto, setGasto} = useContext(AccountContext);
    let {currentId} = useContext(AccountContext);
    let {cuentas} = useContext(AccountContext);

    useEffect(() => {
        
        const divGastos = document.querySelector('#divGastos');
        const divBalance = document.querySelector('#divBalance');
        const accountSep = document.querySelector('.accountSep');
        if (gasto){
            divGastos.classList = 'col-12 col-sm-5 mt-4';
            divBalance.classList = 'col-12 col-sm-5 mt-4';
            accountSep.classList = 'accountSep';
        }else{
            divGastos.classList = 'd-none';
            divBalance.classList = 'd-none';
            accountSep.classList = 'accountSep d-none';
            };
    }, [gasto]);

    cuentas = cuentas || [];

    let cuenta = {};

    cuentas.forEach(element => {
        if(element.id===currentId){
            cuenta = element;
        }
    });

    let total = 0;
    let gastos = [];
    if(cuenta.gastos){
        gastos = cuenta.gastos;
        gastos.forEach(gasto => {
            total+=Number(gasto.precio);
        });
    }
    cuenta.precioTotal = total;
    cuenta.id = cuenta.id || 0;

  return (
    <div id='divGastos' className='col-12 col-sm-5 mt-4'>
        <h2>Gastos</h2>
        <hr className='my-0'/>
        <div>
            <ul
                className="list-group list-group-flush text-start mt-3">
                    {  
                        gastos.map( (gasto,j) => {
                            return (
                                    <GastosItem 
                                        key={gasto.id}
                                        gasto={gasto}
                                        i={j}
                                    />
                            );
                        })
                    }
            </ul>
        </div>
        <div className='row mt-4'>
            <h3 className='col-6 text-center fw-bold'>Total</h3>
            <h3 className='col-6 text-center'>{total}€</h3>
        </div>
        <button
            id='btnAddGasto'
            className='botonBox mt-1 btn-block w-100 m-auto'
            onClick={() => {
                setNewGasto(newGasto => !newGasto);
                setGasto(gasto => !gasto);
                
            }}
        >
            Agregar Gasto
        </button>
    </div>
    );
};
